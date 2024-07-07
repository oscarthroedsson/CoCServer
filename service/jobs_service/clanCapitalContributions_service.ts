import prisma from "../../prisma";
import { ClanCapitalContributions } from "./types/job.types";

export async function addClanCapitalContributions_clashyStats(data: ClanCapitalContributions) {
  try {
    const player = await prisma.clanCapitalContributionsHistory.create({
      data: {
        gameTag: data.gameTag,
        clanTag: data.clanTag,
        capitalContributions: data.capitalContributions ? data.capitalContributions : null,
        totalContributions: data.totalContributions,
      },
    });

    return player;
  } catch (error) {
    throw new Error(
      `Error while storing clan capital contributions | Error: ${error} | fn: addClanCapitalContributions_clashyStats`
    );
  }
}

export async function getLatestClanCapitalContributions_clashyStats(gameTag: string) {
  try {
    const latestTrophyHistory = await prisma.clanCapitalContributionsHistory.findFirst({
      where: {
        gameTag: gameTag,
      },
      orderBy: {
        createdAt: "desc", // Sortera efter createdAt i fallande ordning för att få den senaste tillagda
      },
    });

    return latestTrophyHistory;
  } catch (error) {
    throw new Error(
      `Error while fetching latest clan capital contributions | Error: ${error} | fn: getLatestClanCapitalContributions_clashyStats`
    );
  }
}
