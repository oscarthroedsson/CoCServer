import prisma from "../../prisma";

import { changeToURLencoding } from "../../utils/helpers/urlEncoding";
import { CwlMatchObject } from "../../models/types/cwlMatchObject.types";
import { Prisma } from "@prisma/client";

import { ClanWarLeagueAttack } from "../types/clanWarLeague.types";
import {
  ClanWarLeagueAttack_clashyClash,
  ClanWarLeagueGroup_clashyClash,
  ClanWarLeagueMatch_clashyClash,
} from "../../types/ClashyStats/clanWarLeague.types";
import { connect } from "http2";

export async function storeClanWarLeagueSeason_ClashyStats(year: number, month: number) {
  return await prisma.clanWarLeagueSeason.upsert({
    where: {
      seasonYear_seasonMonth: {
        seasonYear: year,
        seasonMonth: month,
      },
    },
    update: {},
    create: {
      seasonYear: year,
      seasonMonth: month,
    },
  });
}
export async function getClanWarLeagueSeason_ClashyStats() {}

export async function storeClanWarLeagueGroup_clashyStats(seasonId: number) {
  return await prisma.clanWarLeagueGroup.create({
    data: {
      seasonId: seasonId,
    },
  });
}
export async function getClanWarLeagueGroup_clashyStats(seasonId: number, month: number) {}

export async function storeClanWarLeagueGroupClan_ClashyStats(groupId: number, clans: { tag: string; name: string }[]) {
  try {
    return await prisma.clanWarLeagueGroupClan.createMany({
      data: clans.map((clan) => ({
        groupId: groupId,
        clanTag: clan.tag,
      })),
    });
  } catch (error) {
    console.log("Error while adding groupClans:", error);
    return;
  }
}

export async function storeClanWarLeagueRound_ClashyStats(groupID: number, roundNumber: number) {
  return await prisma.clanWarLeagueRound.create({
    data: {
      groupId: groupID,
      roundNumber: roundNumber,
    },
  });
}

export async function storeClanWarLeagueMatch_ClashyStats(roundID: number, match: ClanWarLeagueMatch_clashyClash) {
  try {
    return await prisma.clanWarLeagueMatch.create({
      data: {
        roundId: roundID,
        clanOneTag: match.clanOneData.tag,
        clanTwoTag: match.clanTwoData.tag,
        clanOneStats: match.clanOneStats,
        clanTwoStats: match.clanTwoStats,
        winner: match.winner,
      },
    });
  } catch (error) {
    console.error("Fel vid lägg till match:", error);
    throw error;
  }
}
export async function getClanWarLeagueMatch_ClashyStats(
  attackerTag: string,
  defenderTag: string,
  seasonYear: number,
  seasonMonth: number
) {}

export async function storeClanWarLeagueAttack_ClashyStats(attack: ClanWarLeagueAttack_clashyClash) {
  try {
    return await prisma.clanWarLeagueAttack.create({
      data: {
        matchId: attack.matchId,
        attackerPlayerTag: attack.attackerPlayerTag,
        defenderPlayerTag: attack.defenderPlayerTag,
        stars: attack.stars,
        destructionPercentage: attack.destructionPercentage,
        duration: attack.duration,
        gotAttacked: attack.gotAttacked,
      },
    });
  } catch (error) {
    console.error("Fel vid lägg till attack:", error);
    throw error;
  }
}

export async function getClanWarLeagueWar(clanTag: string, seasonYear: number, seasonMonth: number) {
  return await prisma.clanWarLeagueSeason.findFirst({
    where: {
      seasonYear,
      seasonMonth,
      ClanWarLeagueGroup: {
        some: {
          groupClans: {
            some: {
              clanTag,
            },
          },
        },
      },
    },
    include: {
      ClanWarLeagueGroup: {
        include: {
          groupClans: {
            include: {
              clan: true,
            },
          },
          rounds: {
            include: {
              matches: {
                include: {
                  clanOne: true,
                  clanTwo: true,
                },
              },
            },
          },
        },
      },
    },
  });
}
