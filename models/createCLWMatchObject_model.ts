import { convertToCorrectDateObject } from "../utils/helpers/converToCorrectDateObj";
import { foundMatchWinner } from "../utils/helpers/foundMatchWinner";
import { CwlMatchObject } from "./types/cwlMatchObject.types";

export function createCLWMatchObject_model(
  cwlGroup: any,
  matchInfo: any,
  warTag: string,
  index: string
): CwlMatchObject[] {
  /**
     Clan is team one which is under key: matchInfo.clan
     Opponent is team two which is under key: matchInfo.opponent

     The api give date in iso8601 format and we need to convert it first
     */

  const clanOne = {
    warTag: warTag,
    clanTag: matchInfo.clan.tag,
    season: cwlGroup.season, // string look like this → YYYY-MM
    seasonYear: Number(cwlGroup.season.split("-")[0]), // get year and convert to number
    seasonMonth: Number(cwlGroup.season.split("-")[1]), // get month and convert to number
    startTime: convertToCorrectDateObject(matchInfo.startTime), // when the match
    endTime: convertToCorrectDateObject(matchInfo.endTime), // when the match ended
    round: Number(index), // do not +1 on index, that is done on the client sides
    teamSize: matchInfo.teamSize,
    numOfAttacks: 1,
    stars: matchInfo.clan.stars,
    attacks: matchInfo.clan.attacks,
    destructionPercentage: matchInfo.clan.destructionPercentage,
    winner: foundMatchWinner(
      {
        clanTag: matchInfo.clan.tag,
        destructionPercentage: matchInfo.clan.destructionPercentage,
        stars: matchInfo.clan.stars,
      },
      {
        clanTag: matchInfo.opponent.tag,
        destructionPercentage: matchInfo.opponent.destructionPercentage,
        stars: matchInfo.opponent.stars,
      }
    ),
    opponent: matchInfo.opponent.tag,
    opponentsAttacks: matchInfo.opponent.attacks,
  };

  const clanTwo = {
    warTag: warTag,
    clanTag: matchInfo.opponent.tag,
    season: cwlGroup.season, // string look like this → YYYY-MM
    seasonYear: Number(cwlGroup.season.split("-")[0]), // get year and convert to number
    seasonMonth: Number(cwlGroup.season.split("-")[1]), // get month and convert to number
    startTime: convertToCorrectDateObject(matchInfo.startTime), // when the match started
    endTime: convertToCorrectDateObject(matchInfo.endTime), // when the match ended
    round: Number(index), // do not +1 on index, that is done on the client side
    teamSize: matchInfo.teamSize,
    numOfAttacks: 1,
    stars: matchInfo.opponent.stars,
    attacks: matchInfo.opponent.attacks,
    destructionPercentage: matchInfo.clan.destructionPercentage,
    winner: foundMatchWinner(
      {
        clanTag: matchInfo.opponent.tag,
        destructionPercentage: matchInfo.opponent.destructionPercentage,
        stars: matchInfo.opponent.stars,
      },
      {
        clanTag: matchInfo.clan.tag,
        destructionPercentage: matchInfo.clan.destructionPercentage,
        stars: matchInfo.clan.stars,
      }
    ),
    opponent: matchInfo.clan.tag,
    opponentsAttacks: matchInfo.clan.attacks,
  };

  return [clanOne, clanTwo];
}
