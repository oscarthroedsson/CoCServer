import { ClanWarLeagueMatchClanObject_Supercell } from "../types/Clan/clanObject_Supercell.types";
import { findMatchWinner } from "../utils/helpers/foundMatchWinner";

export function convertToMatchObject(
  id: number,
  round: number,
  clanOne: ClanWarLeagueMatchClanObject_Supercell,
  clanTwo: ClanWarLeagueMatchClanObject_Supercell
) {
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
    winner: findMatchWinner(
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
    ),
  };
}
