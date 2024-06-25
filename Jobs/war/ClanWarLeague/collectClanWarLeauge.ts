// import {
//   getClanWarLeagueGroup_superCell,
//   getClanWarLeagueRoundMatch_superCell,
// } from "../../../API/ClanWarLeague/clanWarLeague_Api";
// import { getAllClans_clashyStats } from "../../../service/Clan/clan_service";
// import {
//   storeClanWarLeagueAttacks_clashyStats,
//   storeClanWarLeagueGroup_clashyStats,
//   storeClanWarLeagueMatch_clashyStats,
// } from "../../../service/ClanWarLeague/clanWarLeague_service";
// import { doesCWLMatchExist_clashyStats } from "../../../validation/war/doesCWLMatchExist";
// import { isClanWarLeagueActive_superCell } from "../../../validation/war/isClanWarLeagueActive";
// import { findMatchWinner } from "../../../utils/helpers/foundMatchWinner";

// import { CwlMatchObject } from "../../../models/types/cwlMatchObject.types";
// import { convertToCWLMatchObject } from "../../../models/convertToCWLMatchObjects";
// import { convertToAttackObject } from "../../../models/convertToAttackObject";
// import { onBoard_ClanAndMembers } from "../../../middlewares/Onboarding/clan_Onboarding";

export async function collectClanWarLeauge() {
  // const allClans = await getAllClans_clashyStats();
  // const date = new Date();
  // console.log("Date: ", date);
  // //
  // for (const clan of allClans) {
  //   // // 1. Check if a CWL is active
  //   const isActive = await isClanWarLeagueActive_superCell(clan.clanTag);
  //   if (!isActive.status) continue; // if not, check the if the other clans have active CWL
  //   // If it is active, get the group and onBoard the clan and its members
  //   //? CWL EN ARRAY OF CLANS SOM ÄR MED I GRUPPEN? ISF SKA VI KÖRA ONBOARD VIA LOOP
  //   const cwlGroup = await getClanWarLeagueGroup_superCell(clan.clanTag);
  //   if (!cwlGroup) continue;
  //   // Adding the clan  and onboard the clan, members, warhistory and clancapital
  //   for (const clan of cwlGroup.clans) {
  //     if (isActive.status) await onBoard_ClanAndMembers(clan);
  //   }
  //   const clansOfGroup = cwlGroup.clans.map((clan: any) => clan.tag);
  //   const year = Number(cwlGroup.season.split("-")[0]);
  //   const month = Number(cwlGroup.season.split("-")[1]);
  //   const warGroup = await storeClanWarLeagueGroup_clashyStats(year, month, clansOfGroup);
  //   if (!warGroup) continue; // if the storeClanWarLeagueGroup_clashyStats fails, continue to the next clan
  //   // Loops over the array that holds all the war matches {rounds}
  //   for (const [index, round] of cwlGroup.rounds.entries()) {
  //     for (const warTag of round.warTags) {
  //       const matchObject = await getClanWarLeagueRoundMatch_superCell(warTag);
  //       const convertedMatchObject = convertToCWLMatchObject(
  //         warGroup.id,
  //         index + 1,
  //         matchObject.clan,
  //         matchObject.opponent
  //       );
  //       if (!convertedMatchObject) continue;
  //       const matchExists = await doesCWLMatchExist_clashyStats(
  //         convertedMatchObject.groupId,
  //         convertedMatchObject.clanOneTag
  //       );
  //       if (matchExists) continue;
  //       const { id } = await storeClanWarLeagueMatch_clashyStats(convertedMatchObject);
  //       const allAttacksArray = convertToAttackObject(matchObject.clan.members, matchObject.opponent.members, id);
  //       await storeClanWarLeagueAttacks_clashyStats(allAttacksArray);
  //     }
  //   }
  //   break;
  // }
}
