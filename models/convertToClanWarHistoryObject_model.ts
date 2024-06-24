/*
  Ta följande nyckler

  NYCKLAR     |     DB
  endTime     |     seasonYear, seasonMonth -
  teamSize    |     teamSize -
  result      |     winner
  clan.tag    |     clanOneTag -
  opponent.tag|     clanTwoTag - 
  clan        |     clanOneStats
  opponent    |     clanTwoStats
  */

import { WarLog_ClanWarHistory } from "../types/Supercell/warLog.types";
import { convertToCorrectDateObject } from "../utils/helpers/converToCorrectDateObj";
import { ClanWarMatchObject } from "./types/clanWarObject.types";
import { getAttackPercentage } from "../utils/helpers/getAttackPercentage";

export function convertToClanWarHistoryObject(warData: WarLog_ClanWarHistory): ClanWarMatchObject | undefined {
  if (!warData) return;

  const clanWinnerOfWar = warData.result === "win" ? warData.clan.tag : warData.opponent.tag;

  return {
    clanOneTag: warData.clan.tag,
    clanTwoTag: warData.opponent.tag,
    teamSize: warData.teamSize,
    seasonYear: convertToCorrectDateObject(warData.endTime).getFullYear(),
    seasonMonth: convertToCorrectDateObject(warData.endTime).getMonth(),
    winner: warData.result !== "tie" ? clanWinnerOfWar : "tie",
    clanOneStats: {
      attacks: warData.clan.attacks,
      attackPercentage: ((warData.teamSize * warData.attacksPerMember) / warData.clan.attacks) * 100,
      stars: warData.clan.stars,
      destructionPercentage: warData.clan.destructionPercentage,
      expEarned: warData.clan.expEarned,
    },
    clanTwoStats: {
      attacks: warData.opponent.attacks,
      attackPercentage: ((warData.teamSize * warData.attacksPerMember) / warData.opponent.attacks) * 100,
      stars: warData.opponent.stars,
      destructionPercentage: warData.opponent.destructionPercentage,
      expEarned: warData.opponent.expEarned,
    },
  };
}
/*
 stars: number;
  attacks: number;
  attackPercentage: number;
  destructionPercentage: number;
  expEarned: number;
*/

/*
  API RESPONSE
  {
            "result": "lose",
            "endTime": "20240621T102832.000Z",
            "teamSize": 15,
            "attacksPerMember": 2,
            "battleModifier": "none",
            "clan": {
                "tag": "#2QJ2QG29R",
                "name": "swedish heros",
                "badgeUrls": {
                    "small": "https://api-assets.clashofclans.com/badges/70/6J6puPE9DfGRztF08u4sZdgVwKm0s4XgD988dyxr-jo.png",
                    "large": "https://api-assets.clashofclans.com/badges/512/6J6puPE9DfGRztF08u4sZdgVwKm0s4XgD988dyxr-jo.png",
                    "medium": "https://api-assets.clashofclans.com/badges/200/6J6puPE9DfGRztF08u4sZdgVwKm0s4XgD988dyxr-jo.png"
                },
                "clanLevel": 17,
                "attacks": 20,
                "stars": 38,
                "destructionPercentage": 93.6,
                "expEarned": 225
            },
            "opponent": {
                "tag": "#Q0V8JLQP",
                "name": "ХАМАГ МОНГОЛ",
                "badgeUrls": {
                    "small": "https://api-assets.clashofclans.com/badges/70/k7fPg1R0gWjYi4yg9G5TuQomNV5AC4pmVQcLvRLFuTw.png",
                    "large": "https://api-assets.clashofclans.com/badges/512/k7fPg1R0gWjYi4yg9G5TuQomNV5AC4pmVQcLvRLFuTw.png",
                    "medium": "https://api-assets.clashofclans.com/badges/200/k7fPg1R0gWjYi4yg9G5TuQomNV5AC4pmVQcLvRLFuTw.png"
                },
                "clanLevel": 27,
                "stars": 44,
                "destructionPercentage": 99.53333
            }
        },
  */
