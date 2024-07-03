import { convertToCWLMatchObject } from "../../../models/convertToCWLMatchObjects";
import {
  getClanWarLeagueRound_ClashyStats,
  storeClanWarLeagueAttack_ClashyStats,
  storeClanWarLeagueMatch_ClashyStats,
  storeClanWarLeagueRound_ClashyStats,
} from "../../../service/ClanWarLeague/clanWarLeague_service";
import { ClanWarLeagueMatchClanObject_Supercell } from "../../../types/Supercell/clanWarLeague.types";
import { doesClanWarLeagueRoundExist_clashyStats } from "../../../validation/war/ClanWarLeague_validations";

export async function storeClanWarLeaguePastMatches(
  groupID: number,
  roundIndex: number,
  clan: ClanWarLeagueMatchClanObject_Supercell,
  opponent: ClanWarLeagueMatchClanObject_Supercell
) {
  console.log("🚂 Wanted to add past match");

  let roundID = 0;
  const match = convertToCWLMatchObject(groupID, roundIndex, clan, opponent);

  const roundExist = await doesClanWarLeagueRoundExist_clashyStats(groupID, roundIndex);

  console.log({ groupID, roundIndex, roundExist });
  if (!roundExist) {
    const { id: theRoundID } = await storeClanWarLeagueRound_ClashyStats(groupID, roundIndex);
    roundID = theRoundID;
  } else {
    const round = await getClanWarLeagueRound_ClashyStats(groupID, roundIndex);
    if (round) roundID = round.id;
  }

  const { id: matchID } = await storeClanWarLeagueMatch_ClashyStats(roundID, match);
  const allAttacks = [...match.clanOneStats.attacks, ...match.clanTwoStats.attacks];

  for (const attack of allAttacks) {
    console.log("🏓 Attack: ", attack);
    // don´t have a good way of validate if attack exist....
    attack.matchId = matchID;
    await storeClanWarLeagueAttack_ClashyStats(attack);
  }
}
