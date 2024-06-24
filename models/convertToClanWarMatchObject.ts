import { convertToCorrectDateObject } from "../utils/helpers/converToCorrectDateObj";
import { findMatchWinner } from "../utils/helpers/foundMatchWinner";
import { getAttackPercentage } from "../utils/helpers/getAttackPercentage";
import { ClanWarMatchObject, Supercell_CurrrentClanWarData } from "./types/clanWarObject.types";

/**
 * @description This function converts the response from the supercell API to a ClanWarMatchObject that we can store in our database.
 * @param clanWarData The response from the supercell API | /clans/{clanTag}/currentwar
 * @returns
 */
export function convertToClanWarMatchObject(clanWarData: Supercell_CurrrentClanWarData): ClanWarMatchObject {
  return {
    seasonYear: convertToCorrectDateObject(clanWarData.startTime).getFullYear(),
    seasonMonth: convertToCorrectDateObject(clanWarData.startTime).getMonth(),
    startTime: convertToCorrectDateObject(clanWarData.startTime).fulldate,
    endTime: convertToCorrectDateObject(clanWarData.endTime).fulldate,
    clanOneTag: clanWarData.clan.tag,
    clanTwoTag: clanWarData.opponent.tag,
    clanOneStats: {
      stars: clanWarData.clan.stars,
      attacks: clanWarData.clan.attacks,
      attackPercentage: getAttackPercentage(
        clanWarData.attacksPerMember,
        clanWarData.teamSize,
        clanWarData.clan.members
      ),
      destructionPercentage: clanWarData.clan.destructionPercentage,
      expEarned: clanWarData.clan.expEarned,
    },
    clanTwoStats: {
      stars: clanWarData.opponent.stars,
      attacks: clanWarData.opponent.attacks,
      attackPercentage: getAttackPercentage(
        clanWarData.attacksPerMember,
        clanWarData.teamSize,
        clanWarData.opponent.members
      ),
      destructionPercentage: clanWarData.opponent.destructionPercentage,
      expEarned: clanWarData.clan.expEarned,
    },
    teamSize: clanWarData.teamSize,
    winner: findMatchWinner(clanWarData.clan, clanWarData.opponent),
  };
}
