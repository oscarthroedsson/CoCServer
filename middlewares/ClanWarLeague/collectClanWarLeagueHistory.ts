import { on } from "events";
import { convertToCWLAttackObject_model } from "../../models/convertToCWLAttackObject_model";
import { convertToCWLGroupObject_model } from "../../models/convertToCWLGroupObject_model";
import { convertToCWLMatchObject } from "../../models/convertToCWLMatchObjects";
import {
  getClanWarLeagueGroup_clashyStats,
  getClanWarLeagueMatch_clashyStats,
  storeClanWarLeagueAttacks_clashyStats,
  storeClanWarLeagueGroupClan_clashyStats,
  storeClanWarLeagueGroup_clashyStats,
  storeClanWarLeagueMatch_clashyStats,
} from "../../service/ClanWarLeague/clanWarLeague_service";
import { CWLMatchObjectMemberList_Supercell } from "../../types/Supercell/clanWarLeague.types";
import { doesClanExist_clashyStats } from "../../validation/Clan/doesClanExist";
import { doesPlayerExist_clashyStats } from "../../validation/Player/doesPlayerExist";
import {
  doesClanWarLeagueAttackExist_clashyStats,
  doesClanWarLeagueGroupClanExist_clashyStats,
  doesClanWarLeagueGroupExist_clashyStats,
  doesClanWarLeagueMatchExist_clashyStats,
} from "../../validation/war/ClanWarLeague_validations";
import { onBoard_Clan } from "../Onboarding/clan_Onboarding";
import { onBoard_Player } from "../Onboarding/player_Onboarding";
import { getCLWGroupHistory_ClashKing } from "../../API/ClashKing/CWLHistory/clanWarLeagueHistory_clashKing";
import { ClanWarLeagueMatch_clashyClash } from "../../types/ClashyStats/clanWarLeague.types";

export async function collectClanWarLeagueHistory(clanTag: string) {
  let CWLgroup;
  let CwlMatch: ClanWarLeagueMatch_clashyClash | null = null;
  let rounds = 12; // will get 12 month history
  let currentDate = new Date();
  let month = currentDate.getMonth();

  let year = currentDate.getFullYear();

  if (month === 0) {
    month = 12;
    year = year - 1;
  }

  while (rounds !== 0) {
    console.log("ROUNDS: ", rounds);
    // 📚 Get the past CWL groups based on seasons
    const cwlGroupHistory = await getCLWGroupHistory_ClashKing(clanTag, year, month);
    if (!cwlGroupHistory) return console.log("❗❗ FETCH FAILED");
    console.log("🚓 cwlGroupHistory: ", cwlGroupHistory);
    if (cwlGroupHistory) console.log("💵 cwlGroupHistory valid");
    const clans = cwlGroupHistory.clans.map((clan: any) => clan.tag); //  Get all the clans in the group
    console.log("🚓 clans: ", clans);
    if (clans) console.log("💵 clans valid");
    const allPlayersOfAllClans = cwlGroupHistory.clans.flatMap((clan: any) =>
      clan.members.map((member: { tag: string; name: string }) => ({
        tag: member.tag,
        name: member.name,
      }))
    );

    // 📚 Check if the clan exist, if not we add them
    console.log("💬 Onboarding neccesery clans");
    for (const tag of clans) {
      const clanExist = await doesClanExist_clashyStats(tag);
      if (!clanExist) {
        await onBoard_Clan(tag);
        continue;
      }
    }

    // 📚 Check if the players exist, if not we add them
    console.log("💬 Onboarding neccesery Players");
    for (const member of allPlayersOfAllClans) {
      const playerExist = await doesPlayerExist_clashyStats(member.tag);
      if (!playerExist) {
        await onBoard_Player(member.tag);
        console.log("🏌🏼‍♂️ Added player: ", member.name);
        continue;
      }
    }

    // 📚 Check if the group exist, if not we add them
    console.log("💬 Validate → CWL group exits", year, " ", month);
    const groupExist = await doesClanWarLeagueGroupExist_clashyStats(year, month);
    console.log("🚓 groupExist: ", groupExist);
    if (!groupExist) {
      const newGroup = await storeClanWarLeagueGroup_clashyStats(year, month, clans);
      console.log("🚓 newGroup: ", newGroup);
      if (!newGroup) return;
      CWLgroup = newGroup;
    } else {
      CWLgroup = await getClanWarLeagueGroup_clashyStats(year, month);
    }

    if (!CWLgroup || !CWLgroup.id) return;

    // 📚 Loop over every round in rounds
    console.log("🏁 Loop starts");
    for (const [index, round] of cwlGroupHistory.rounds.entries()) {
      /*
   📚 Loop over every match in rounds, create a match object and attacks object. s
   */
      for (const match of round.warTags) {
        const groupConnectionExist = doesClanWarLeagueGroupClanExist_clashyStats(match.clan.tag);
        if (!groupConnectionExist) await storeClanWarLeagueGroupClan_clashyStats(match.clan.tag, CWLgroup.id);

        // 📚 Check if the match exist, if not we add them
        const clanWarLeagueMatchObject = convertToCWLMatchObject(CWLgroup.id, index, match.clan, match.opponent);
        console.log("🚓 clanWarLeagueMatchObject: ", clanWarLeagueMatchObject);
        if (!clanWarLeagueMatchObject || !clanWarLeagueMatchObject.groupId) return;

        const matchExist = await doesClanWarLeagueMatchExist_clashyStats({
          groupId: clanWarLeagueMatchObject.groupId,
          round: clanWarLeagueMatchObject.round,
          clanOneTag: clanWarLeagueMatchObject.clanOneTag,
          clanTwoTag: clanWarLeagueMatchObject.clanTwoTag,
        });

        console.log("🚓 matchExist: ", matchExist);
        if (!matchExist) {
          console.log("⛑️ Store Match");
          CwlMatch = await storeClanWarLeagueMatch_clashyStats(clanWarLeagueMatchObject);
        } else {
          console.log("💬 Get → CWL Match");
          CwlMatch = await getClanWarLeagueMatch_clashyStats(year, month, match.clan.tag, match.opponent.tag);
        }

        if (!CwlMatch || !CwlMatch.id || CwlMatch.id === undefined) return;
        const clanAttacks = match.clan.members.flatMap((member: CWLMatchObjectMemberList_Supercell) => {
          return convertToCWLAttackObject_model(CwlMatch!.id!, member);
        });

        const opponentAttacks = match.opponent.members.flatMap((member: CWLMatchObjectMemberList_Supercell) => {
          return convertToCWLAttackObject_model(CwlMatch!.id!, member);
        });

        const allAttacks = [...clanAttacks, ...opponentAttacks];

        console.log("⛑️ Adding Attack");
        for (const attack of allAttacks) {
          for (const tag of [attack.attackerPlayerTag, attack.defenderPlayerTag]) {
            console.log("🏷️ tag:", tag);
            if (tag === null) continue;
            const playerExits = await doesPlayerExist_clashyStats(tag);
            console.log("🪴 playerExits: ", playerExits);
            if (!playerExits) await onBoard_Player(tag);
            console.log("🎉 Added player");
          }

          const attackExits = await doesClanWarLeagueAttackExist_clashyStats(
            CwlMatch.id,
            attack.attackerPlayerTag,
            attack.defenderPlayerTag
          );
          console.log("🪴 attackExits: ", attackExits);
          if (attackExits || attack.attackerPlayerTag === null) continue;
          await storeClanWarLeagueAttacks_clashyStats(attack);
        }
      }
    }

    if (month === 0) {
      month = 12;
      year = year - 1;
    } else {
      month = month - 1;
    }
    rounds--;
  }
}
