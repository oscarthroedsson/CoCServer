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
    // This is an upsert, if exist it returns, if not it creates and returns
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
        console.log("🚓 doesClanExist: ", doesClanExist);
        await storeClan_ClashyStats({ tag: clan.tag, name: clan.name });
        console.log("🟢 Clan added to DB: ", clan.tag, " | ", clan.name);
      }
    }

    const allMembers = cwlGroupHistory.clans.flatMap(
      (clan: { tag: string; members: { tag: string; name: string }[] }) =>
        clan.members.map((member: { tag: string; name: string }) => ({
          tag: member.tag,
          name: member.name,
          clanTag: clan.tag,
        }))
    );

    console.log("⏰ 😴 Adding members ");

    for (const member of allMembers) {
      if (!member || !member.tag) continue;

      const doesMemberExist = await doesPlayerExist_clashyStats(member.tag);
      if (!doesMemberExist) {
        await onBoard_Player({
          gameTag: member.tag,
          gameName: member.name,
          clanTag: member.clanTag,
          email: null,
          acceptTerms: false,
        });
      }
    }
    console.log("📦 added all members", allMembers.length, " st");
    groupObject.members = allMembers;

    // ---------------------------------------- 🧺 ADD TO DB ----------------------------------------
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
          console.log("🪖🪖🪖 attack: ", attack);
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
