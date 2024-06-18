import { convertToCorrectDateObject } from "../utils/helpers/converToCorrectDateObj";
import { findMatchWinner } from "../utils/helpers/foundMatchWinner";
import { getAttackPercentage } from "../utils/helpers/getAttackPercentage";
import { ClanWarMatchObject, Supercell_CurrrentClanWarData } from "./types/clanWarObject.types";

export function convertToClanWarMatchObject(clanWarData: Supercell_CurrrentClanWarData): ClanWarMatchObject {
  return {
    seasonYear: convertToCorrectDateObject(clanWarData.startTime).getFullYear(),
    seasonMonth: convertToCorrectDateObject(clanWarData.startTime).getMonth(),
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
    },
    teamSize: clanWarData.teamSize,
    winner: findMatchWinner(clanWarData.clan, clanWarData.opponent),
  };
}
