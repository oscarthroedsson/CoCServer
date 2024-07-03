// APIs
import { getClanWarHistory_ClashKing } from "../../API/ClashKing/ClanWarHistory/clanWarHistory_clashKing";

// DATABASE
import {
  checkIfClansMatchObjectExist_clashyStats,
  storeClanWarMatch_clashyStats,
  storeClanWarAttack_clashyStats,
} from "../../service/clanWar/clanWar_service";

// MODELS
import { convertToClanWarMatchObject } from "../../models/convertToClanWarMatchObject";
import { convertToClanWarAttackObject } from "../../models/convertToClanWarAttackObjec";
import { convertToCorrectDateObject } from "../../utils/helpers/converToCorrectDateObj";
import { ClanWarMemberObject_Supercell, ClanWarObject_Supercell } from "../../types/Supercell/clanWar.types";
import { doesClanExist_clashyStats } from "../../validation/Clan/doesClanExist";
import { onBoard_Clan } from "../Onboarding/clan_Onboarding";
import { doesPlayerExist_clashyStats } from "../../validation/Player/doesPlayerExist";

import { onBoard_Player } from "../Onboarding/player_Onboarding";
import { doesClanWarAttackExist_clashyStats } from "../../validation/war/doesClanWarAttackExist";

/**
 * Collects clan war history for a given clan. And stores it in our database.
 * @function
 * @name getClanWarHistory_ClashKing
 * @name convertToCorrectDateObject
 * @name checkIfClansMatchObjectExist_clashyStats
 * @name convertToClanWarMatchObject
 * @name storeClanWarMatch_clashyStats
 * @name convertToClanWarAttackObject
 * @name storeClanWarAttack_clashyStats
 *
 * @param clanTag - The tag of the clan to collect war history for.
 */
export async function collectClanWarHistory(clanWarObject: ClanWarObject_Supercell) {
  console.log("🚂 Collect clan war history");
  const startTime: Date = convertToCorrectDateObject(clanWarObject.startTime).fulldate;
  const endTime: Date = convertToCorrectDateObject(clanWarObject.endTime).fulldate;

  //📚 Validating if clan and opponent exist in the DB before I start to build
  const opponentExist = await doesClanExist_clashyStats(clanWarObject.opponent.tag);
  if (!opponentExist) {
    try {
      console.log("🏁 Onboarding a clan: ", clanWarObject.clan.tag, clanWarObject.clan.name);
      await onBoard_Clan(clanWarObject.opponent.tag);
    } catch (e) {
      console.error("🚨🚨🚨 collectClanWarHistory", e);
      return;
    }
  }
  const clanExists = await doesClanExist_clashyStats(clanWarObject.clan.tag);
  if (!clanExists) {
    try {
      console.log("🏁 Onboarding a clan: ", clanWarObject.clan.tag, clanWarObject.clan.name);
      await onBoard_Clan(clanWarObject.clan.tag);
    } catch (e) {
      console.error("🚨🚨🚨 collectClanWarHistory", e);
      return;
    }

    // 📚 Validating if clan andopponents member exist
    for (const member of clanWarObject.clan.members) {
      if (!member.tag) {
        console.error("🚨🚨🚨 collectClanWarHistory", member.tag);
      }
      const playerExist = await doesPlayerExist_clashyStats(member.tag);

      if (!playerExist) {
        try {
          await onBoard_Player({
            gameName: member.name,
            gameTag: member.tag,
            clanTag: clanWarObject.clan.tag,
            email: null,
            acceptTerms: false,
          });
        } catch (e) {
          return;
        }
      }
    }
  }

  for (const opponentMember of clanWarObject.opponent.members) {
    if (!opponentMember.tag) {
      console.error("🚨🚨🚨 collectClanWarHistory", opponentMember.tag);
      continue;
    }

    const playerExist = await doesPlayerExist_clashyStats(opponentMember.tag);

    if (!playerExist) {
      try {
        await onBoard_Player({
          gameTag: opponentMember.tag,
          gameName: opponentMember.name,
          clanTag: clanWarObject.opponent.tag,
          email: null,
          acceptTerms: false,
        });
      } catch (e) {
        return;
      }
    }
  }

  //📚 Validate if the matchObject already exisst, if so, cancle
  const matchObjectExist = await checkIfClansMatchObjectExist_clashyStats(clanWarObject.clan.tag, startTime, endTime);
  if (matchObjectExist) return; // If the match object exist, we dont need to store it.

  //📚 Convert the response to a clanWarMatchObject for table: ClanWarMatch Table and stores it
  const clanWarMatchObject = convertToClanWarMatchObject(clanWarObject);
  if (!clanWarMatchObject) return;

  const { id } = await storeClanWarMatch_clashyStats(clanWarMatchObject);
  if (!id) return;

  const clanMembersAttacks = clanWarObject.clan.members.flatMap((player: ClanWarMemberObject_Supercell) => {
    return convertToClanWarAttackObject(id, player);
  });

  if (clanMembersAttacks.length < 1) return;
  const opponentMembersAttacks = clanWarObject.opponent.members.flatMap((player: ClanWarMemberObject_Supercell) => {
    return convertToClanWarAttackObject(id, player);
  });

  const allAttacks = [...clanMembersAttacks, ...opponentMembersAttacks];

  for (const attack of allAttacks) {
    console.log("🪓 attack OBJECT: ", {
      matchId: attack.matchId,
      attackerPlayerTag: attack.attackerPlayerTag,
      defenderPlayerTag: attack.defenderPlayerTag ?? null,
      attack: attack.attack,
    });

    const attackExits = await doesClanWarAttackExist_clashyStats({
      matchId: attack.matchId,
      attackerPlayerTag: attack.attackerPlayerTag,
      defenderPlayerTag: attack.defenderPlayerTag ?? null,
      attack: attack.attack,
    });
    console.log("🪖 attackExits: ", attackExits);

    const playerExist = await doesPlayerExist_clashyStats(attack.attackerPlayerTag);

    //? Tar jag bort if- så kommer vi inte kunna lägga till attackdata, fattar inte varför
    if (!playerExist) return console.log("Player does not exist in the DB", attack.attackerPlayerTag);
    console.log("playerExist: ", playerExist);

    if (attackExits || !playerExist) continue;
    await storeClanWarAttack_clashyStats(attack);
  }
}
