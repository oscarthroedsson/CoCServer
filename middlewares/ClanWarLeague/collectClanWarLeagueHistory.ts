import { getCLWGroupHistory_ClashKing } from "../../API/ClashKing/CWLHistory/clanWarLeagueHistory_clashKing";
import { convertToCWLMatchObject } from "../../models/convertToCWLMatchObjects";
import { storeClan_ClashyStats } from "../../service/Clan/clan_service";
import {
  storeClanWarLeagueAttack_ClashyStats,
  storeClanWarLeagueGroupClan_ClashyStats,
  storeClanWarLeagueGroup_clashyStats,
  storeClanWarLeagueMatch_ClashyStats,
  storeClanWarLeagueRound_ClashyStats,
  storeClanWarLeagueSeason_ClashyStats,
} from "../../service/ClanWarLeague/clanWarLeague_service";
import { storePlayer_clashyStats } from "../../service/Player/player_service";
import { ClanWarLeagueMatch_clashyClash } from "../../types/ClashyStats/clanWarLeague.types";
import { doesClanExist_clashyStats } from "../../validation/Clan/doesClanExist";
import { doesPlayerExist_clashyStats } from "../../validation/Player/doesPlayerExist";
import { onBoard_Player } from "../Onboarding/player_Onboarding";

export async function collectClanWarLeagueHistory(clanTag: string) {
  let rounds = 12; // will get 12 month history
  let currentDate = new Date();
  let month = currentDate.getMonth();
  let year = currentDate.getFullYear();
  const groupObject = {
    id: 1 as number,
    seasonYear: year,
    seasonMonth: month,
    clans: [] as any,
    members: [] as any,
    rounds: [] as any,
  };

  while (rounds !== 0) {
    const { id: seasonID } = await storeClanWarLeagueSeason_ClashyStats(year, month);

    console.log("Season ID:", seasonID);
    if (!seasonID) return;
    const cwlGroupHistory = await getCLWGroupHistory_ClashKing(clanTag, year, month);
    if (!cwlGroupHistory) return console.log("❗❗ No more Data");

    const clans = cwlGroupHistory.clans.map((clan: { tag: string; name: string }) => ({
      tag: clan.tag,
      name: clan.name,
    }));
    groupObject.clans = clans;
    for (const clan of clans) {
      const doesClanExist = await doesClanExist_clashyStats(clan.tag);
      if (!doesClanExist) {
        await storeClan_ClashyStats({ tag: clan.tag, name: clan.name });
        console.log("🟢 Clan added to DB: ", clan.tag, " | ", clan.name);
      }
    }
    const allMembers = cwlGroupHistory.clans.flatMap((clan: { members: { tag: string; name: string }[] }) =>
      clan.members.map((member: { tag: string; name: string }) => ({
        tag: member.tag,
        name: member.name,
      }))
    );
    console.log("⏰ 😴 Adding members ");
    for (const member of allMembers) {
      const doesMemberExist = await doesPlayerExist_clashyStats(member.tag);
      if (!doesMemberExist) {
        await onBoard_Player(member.tag);
      }
    }
    console.log("📦 added all members", allMembers.length, " st");
    groupObject.members = allMembers;

    const { id: groupID } = await storeClanWarLeagueGroup_clashyStats(seasonID);
    await storeClanWarLeagueGroupClan_ClashyStats(groupID, clans);

    // validate and add to DB
    cwlGroupHistory.rounds.forEach(async (roundObject: any, index: number) => {
      const rounds = roundObject.warTags.map((match: any) => {
        return convertToCWLMatchObject(groupID, index + 1, match.clan, match.opponent);
      });
      const { id: roundID } = await storeClanWarLeagueRound_ClashyStats(groupID, index + 1);

      for (const round of rounds) {
        const { id: matchID } = await storeClanWarLeagueMatch_ClashyStats(roundID, round);
        const allAttacks = [...round.clanOneStats.attacks, ...round.clanTwoStats.attacks];
        for (const attack of allAttacks) {
          attack.matchId = matchID;
          await storeClanWarLeagueAttack_ClashyStats(attack);
        }
        console.log("🥕 All Attacks added to DB: ", allAttacks.length);
      }
      console.log("⭕ All rounds added to DB", rounds.length);
    });

    if (month === 0) {
      month = 12;
      year = year - 1;
    } else {
      month--;
    }

    rounds--;
    console.log("🪼 Fetching for: ", year, " ", month, "Round: ", rounds);
  }
  // validate and add the members to the DB
}
