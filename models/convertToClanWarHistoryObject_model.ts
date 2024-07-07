import { WarLog_ClanWarHistory } from "../types/Supercell/warLog.types";
import { convertToCorrectDateObject } from "../utils/helpers/converToCorrectDateObj";
import { ClanWarMatchObject } from "./types/clanWarObject.types";

export function convertToClanWarHistoryObject(warData: WarLog_ClanWarHistory): ClanWarMatchObject | undefined {
  if (!warData) return;

  const clanWinnerOfWar = warData.result === "win" ? warData.clan.tag : warData.opponent.tag;

  return {
    clanOneTag: warData.clan.tag,
    clanTwoTag: warData.opponent.tag,
    teamSize: warData.teamSize,
    seasonYear: convertToCorrectDateObject(warData.endTime).getFullYear(),
    seasonMonth: convertToCorrectDateObject(warData.endTime).getMonth(),
    startTime: convertToCorrectDateObject(warData.startTime).fulldate,
    endTime: convertToCorrectDateObject(warData.endTime).fulldate,
    clanOneStats: {
      attacks: warData.clan.attacks,
      attackPercentage: ((warData.teamSize * warData.attacksPerMember) / warData.clan.attacks) * 100,
      stars: warData.clan.stars,
      destructionPercentage: warData.clan.destructionPercentage,
    },
    clanTwoStats: {
      attacks: warData.opponent.attacks,
      attackPercentage: ((warData.teamSize * warData.attacksPerMember) / warData.opponent.attacks) * 100,
      stars: warData.opponent.stars,
      destructionPercentage: warData.opponent.destructionPercentage,
    },
    winner: warData.result !== "tie" ? clanWinnerOfWar : "tie",
  };
}
