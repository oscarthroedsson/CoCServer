import { getCurrentWar_superCell } from "../../../API/War/war_Api";
import { onBoard_ClanAndMembers } from "../../../middlewares/Onboarding/clan_Onboarding";
import { convertToClanWarAttackObject } from "../../../models/convertToClanWarAttackObjec";
import { convertToClanWarMatchObject } from "../../../models/convertToClanWarMatchObject";
import {
  checkIfClansMatchObjectExist_clashyStats,
  storeClanWarMatch_clashyStats,
  storeClanWarAttack_clashyStats,
} from "../../../service/clanWar/clanWar_service";
import { ClanWarMemberObject_Supercell, ClanWarObject_Supercell } from "../../../types/Supercell/clanWar.types";
import { convertToCorrectDateObject } from "../../../utils/helpers/converToCorrectDateObj";
import { doesClanExist_clashyStats } from "../../../validation/Clan/doesClanExist";
import { doesPlayerExist_clashyStats } from "../../../validation/Player/doesPlayerExist";
import { doesClanWarAttackExist_clashyStats } from "../../../validation/war/doesClanWarAttackExist";

/**
 * @description Collects data from the current clan war and stores it in the database. This function should be run in an loop or get one clan at a time.
 * @param clanTag
 * @returns void
 */

export async function collectClanWar(clanTag: string) {
  // get current clan war data
  const clanWarData: ClanWarObject_Supercell = await getCurrentWar_superCell(clanTag);
  const startTime: Date = convertToCorrectDateObject(clanWarData.startTime).fulldate;
  const endTime: Date = convertToCorrectDateObject(clanWarData.endTime).fulldate;

  const clans = [clanWarData.clan, clanWarData.opponent];
  // validate if clan exist in our DB, if not → add them and their members to our DB
  for (const clan of clans) {
    const clanExist = await doesClanExist_clashyStats(clan.tag);
    if (!clanExist) {
      console.log("🚢 Onboarding Clan And Members");
      await onBoard_ClanAndMembers(clan.tag);
    }
  }

  /*
  Validate if we already have a match object with the clans in the current war. 
  When we run this function the first time, we will add both clans in the war and the members attacks. Therfore, if we run this a seconed time on we dont dublicate and get an error.
  */
  for (const clan of clans) {
    const matchObjectOfOpponentExist = await checkIfClansMatchObjectExist_clashyStats(clan.tag, startTime, endTime);
    if (matchObjectOfOpponentExist) return;
  }

  // convert clanWarData to a clanWarMatch object that we can add to our DB
  const clanWarMatchObject = convertToClanWarMatchObject(clanWarData);

  if (!clanWarMatchObject) return; // todo Skicka mail till mig själv att det inte gick att göra om objektet
  const { id } = await storeClanWarMatch_clashyStats(clanWarMatchObject);

  // 🍭 Loop over clan and opponents member and collect attackobjects
  const clanMembersAttacks = clanWarData.clan.members.flatMap((player: ClanWarMemberObject_Supercell) => {
    return convertToClanWarAttackObject(id, player);
  });

  const opponentMembersAttacks = clanWarData.opponent.members.flatMap((player: ClanWarMemberObject_Supercell) => {
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

    if (attackExits || !playerExist) continue;
    await storeClanWarAttack_clashyStats(attack);
  }
}
