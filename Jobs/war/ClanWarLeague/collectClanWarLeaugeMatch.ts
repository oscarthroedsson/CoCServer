import { getClanWarLeagueRoundMatch_superCell } from "../../../API/ClanWarLeague/clanWarLeague_Api";
import { convertToCWLMatchObject } from "../../../models/convertToCWLMatchObjects";

import {
  getClanWarLeagueRound_ClashyStats,
  storeClanWarLeagueAttack_ClashyStats,
  storeClanWarLeagueMatch_ClashyStats,
  storeClanWarLeagueRound_ClashyStats,
  storeClanWarLeagueSeason_ClashyStats,
} from "../../../service/ClanWarLeague/clanWarLeague_service";

import {
  doesClanWarLeagueGroupExist_clashyStats,
  doesClanWarLeagueRoundExist_clashyStats,
} from "../../../validation/war/ClanWarLeague_validations";
/**
This function is used for jobs and queues. If checkIfClanWarLeagueIsActive is called, and scheduale a job, 
it will run this functinon and pass in the clanTag.
@implements {getClanWarLeagueGroup_superCell,getClanWarLeagueGroup_superCell,storeClanWarLeagueSeason_ClashyStats,doesClanWarLeagueGroupExist_clashyStats,storeClanWarLeagueGroup_clashyStats,storeClanWarLeagueGroupClan_ClashyStats,getClanWarLeagueGroup_clashyStats }
 * @param clanTag 
 * @returns {void}
 */

export async function collectClanWarLeaugeMatch(groupID: number, roundIndex: number, clanTag: string, warTag: string) {
  if (!clanTag || !warTag) return;
  // todo we need to check that it is inWar, or it will be added in checkIfClanWarLeageIsActive /→ storeClanWarLeaguePastMatches()
  const currentDate = new Date();
  let roundID = 0;

  // 📚 We get the current year and month which is the season
  const year = currentDate.getFullYear(); // 📚 We get the current year
  const month = currentDate.getMonth() + 1; // 📚 We get the current month

  //📚 We get the specific match for the clan war league that has been added in queue
  const cwlMatch = await getClanWarLeagueRoundMatch_superCell(warTag);

  // 📚 If it isn´t in war, it will be added as a past match in a few hours.
  if ((cwlMatch?.state, cwlMatch?.state !== "inWar")) return;
  const { id: seasonID } = await storeClanWarLeagueSeason_ClashyStats(year, month); // store the match in the database

  // 💡 We create seasons and groups in checkIfClanWarLeagueIsActive so it is easier to add CWL matches
  // 📚 We check so the group have been created so we can connect the match obj to it
  const groupExist = await doesClanWarLeagueGroupExist_clashyStats(seasonID);
  if (!groupExist) return console.error("❌ Group does not exist");

  // 📚 We convert the match object from supercell to ours and store the match in the database
  const match = convertToCWLMatchObject(groupID, roundIndex, cwlMatch.clan, cwlMatch.opponent);

  const roundExist = await doesClanWarLeagueRoundExist_clashyStats(groupID, roundIndex);
  if (!roundExist) {
    const { id: theRoundID } = await storeClanWarLeagueRound_ClashyStats(groupID, roundIndex);
    roundID = theRoundID;
  } else {
    const round = await getClanWarLeagueRound_ClashyStats(groupID, roundIndex);
    if (round) roundID = round.id;
  }

  const { id: matchID } = await storeClanWarLeagueMatch_ClashyStats(roundID, match);

  // 📚 combine all the attacks and store it in the DB and connect it to the match
  const allAttacks = [...match.clanOneStats.attacks, ...match.clanTwoStats.attacks];
  for (const attack of allAttacks) {
    attack.matchId = matchID;
    await storeClanWarLeagueAttack_ClashyStats(attack);
  }
}
