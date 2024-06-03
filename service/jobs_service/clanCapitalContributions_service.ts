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
    console.error("Error while updating player:", error);
    throw error; // Rethrow the error for error handling
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
    console.error("Error while fetching latest trophy history:", error);
    throw error; // Rethrow the error for error handling
  }
}
