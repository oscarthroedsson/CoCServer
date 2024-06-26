import { ClanWarLeagueMatch_clashyClash } from "../types/ClashyStats/clanWarLeague.types";
import {
  CWLMatchObjectMemberList_Supercell,
  ClanWarLeagueMatchClanObject_Supercell,
} from "../types/Supercell/clanWarLeague.types";
import { findMatchWinner } from "../utils/helpers/foundMatchWinner";
import { convertToAttackObject } from "./convertToAttackObject";

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
    roundId: round,
    round: id,
    clanOneData: { tag: clanOne.tag, name: clanOne.name },
    clanTwoData: { tag: clanTwo.tag, name: clanTwo.name },
    clanOneStats: {
      numOfAttacks: clanOne.attacks,
      stars: clanOne.stars,
      destructionPercentage: clanOne.destructionPercentage,
      //@ts-ignore
      attacks: clanOne.members.flatMap((member: CWLMatchObjectMemberList_Supercell) => {
        return convertToAttackObject(member);
      }),
    },
    clanTwoStats: {
      numOfAttacks: clanOne.attacks,
      stars: clanOne.stars,
      destructionPercentage: clanOne.destructionPercentage,
      //@ts-ignore
      attacks: clanTwo.members.flatMap((member: CWLMatchObjectMemberList_Supercell) => {
        return convertToAttackObject(member);
      }),
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
