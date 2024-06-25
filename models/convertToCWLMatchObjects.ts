import { ClanWarLeagueMatch_clashyClash } from "../types/ClashyStats/clanWarLeague.types";
import { ClanWarLeagueMatchClanObject_Supercell } from "../types/Supercell/clanWarLeague.types";
import { findMatchWinner } from "../utils/helpers/foundMatchWinner";

/**
 * @param id - from groupObject
 * @param round - round
 * @param clanOne - clan.tag
 * @param clanTwo - opponent.tag
 */
export function convertToCWLMatchObject(
  id: number,
  round: number,
  clanOne: ClanWarLeagueMatchClanObject_Supercell,
  clanTwo: ClanWarLeagueMatchClanObject_Supercell
): ClanWarLeagueMatch_clashyClash {
  return {
    groupId: id,
    round: round,
    clanOneTag: clanOne.tag,
    clanTwoTag: clanTwo.tag,
    clanOneStats: {
      attacks: clanOne.attacks,
      stars: clanOne.stars,
      destructionPercentage: clanOne.destructionPercentage,
    },
    clanTwoStats: {
      attacks: clanTwo.attacks,
      stars: clanTwo.stars,
      destructionPercentage: clanTwo.destructionPercentage,
    },
    winner:
      findMatchWinner(
        {
          clanTag: clanOne.tag,
          destructionPercentage: clanOne.destructionPercentage,
          stars: clanOne.stars,
        },
        {
          clanTag: clanTwo.tag,
          destructionPercentage: clanTwo.destructionPercentage,
          stars: clanTwo.stars,
        }
      ) ?? "",
  };
}
