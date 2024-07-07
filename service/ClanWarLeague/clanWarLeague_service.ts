import prisma from "../../prisma";

import {
  ClanWarLeagueAttack_clashyClash,
  ClanWarLeagueMatch_clashyClash,
} from "../../types/ClashyStats/clanWarLeague.types";

export async function storeClanWarLeagueSeason_ClashyStats(year: number, month: number) {
  try {
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
  } catch (error) {
    throw new Error(
      `Error while storing clan war league season | Error: ${error} | fn: storeClanWarLeagueSeason_ClashyStats`
    );
  }
}

export async function storeClanWarLeagueGroup_clashyStats(seasonId: number) {
  try {
    return await prisma.clanWarLeagueGroup.create({
      data: {
        seasonId,
      },
    });
  } catch (error) {
    throw new Error(
      `Error while storing clan war league group | Error: ${error} | fn: storeClanWarLeagueGroup_clashyStats`
    );
  }
}

export async function getClanWarLeagueGroupBasedOnSeasonAndClanTag_clashyStats(
  year: number,
  month: number,
  clanTag: string
): Promise<{ id: number; seasonId: number; groupClans: any[] } | null | undefined> {
  try {
    const result = await prisma.clanWarLeagueGroup.findMany({
      where: {
        season: {
          seasonYear: year,
          seasonMonth: month,
        },
        groupClans: {
          some: {
            clan: {
              clanTag: clanTag,
            },
          },
        },
      },
      include: {
        groupClans: true,
      },
    });
    return result[0];
  } catch (error) {
    throw new Error(
      `Error while getting clan war league group | Error: ${error} | fn: getClanWarLeagueGroupBasedOnSeasonAndClanTag_clashyStats`
    );
  }
}

export async function getClanWarLeagueGroup_clashyStats(seasonId: number) {
  try {
    return await prisma.clanWarLeagueGroup.findFirst({
      where: {
        seasonId: seasonId,
      },
      include: {
        groupClans: true,
        rounds: {
          include: {
            matches: true,
          },
        },
      },
    });
  } catch (error) {
    throw new Error(
      `Error while getting clan war league group | Error: ${error} | fn: getClanWarLeagueGroup_clashyStats`
    );
  }
}

export async function storeClanWarLeagueGroupClan_ClashyStats(groupId: number, clans: { tag: string; name: string }[]) {
  try {
    return await prisma.clanWarLeagueGroupClan.createMany({
      data: clans.map((clan) => ({
        groupId: groupId,
        clanTag: clan.tag,
      })),
    });
  } catch (error) {
    throw new Error(
      `Error while storing clan war league group clan | Error: ${error} | fn: storeClanWarLeagueGroupClan_ClashyStats`
    );
  }
}

export async function storeClanWarLeagueRound_ClashyStats(groupID: number, roundNumber: number) {
  try {
    return await prisma.clanWarLeagueRound.create({
      data: {
        groupId: groupID,
        roundNumber: roundNumber,
      },
    });
  } catch (error) {
    throw new Error(
      `Error while storing clan war league round | Error: ${error} | fn: storeClanWarLeagueRound_ClashyStats`
    );
  }
}

export async function getClanWarLeagueRound_ClashyStats(
  groupID: number,
  roundNumber: number
): Promise<{ id: number; groupId: number; roundNumber: number } | undefined | null> {
  try {
    return await prisma.clanWarLeagueRound.findFirst({
      where: {
        groupId: groupID,
        roundNumber: roundNumber,
      },
    });
  } catch (error) {
    throw new Error(
      `Error while getting clan war league round | Error: ${error} | fn: getClanWarLeagueRound_ClashyStats`
    );
  }
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
    throw new Error(
      `Error while storing clan war league match | Error: ${error} | fn: storeClanWarLeagueMatch_ClashyStats`
    );
  }
}

export async function storeClanWarLeagueAttack_ClashyStats(attack: ClanWarLeagueAttack_clashyClash) {
  try {
    return await prisma.clanWarLeagueAttack.create({
      data: {
        matchId: attack.matchId,
        attack: attack.attack,
        attackerPlayerTag: attack.attackerPlayerTag,
        defenderPlayerTag: attack.defenderPlayerTag,
        stars: attack.stars,
        destructionPercentage: attack.destructionPercentage,
        duration: attack.duration,
        gotAttacked: attack.gotAttacked,
      },
    });
  } catch (error) {
    throw new Error(
      `Error while storing clan war league attack | Error: ${error} | fn: storeClanWarLeagueAttack_ClashyStats`
    );
  }
}

export async function getClanWarLeagueWar(clanTag: string, seasonYear: number, seasonMonth: number) {
  try {
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
  } catch (errorr) {
    throw new Error(`Error while getting clan war league war | Error: ${errorr} | fn: getClanWarLeagueWar`);
  }
}
