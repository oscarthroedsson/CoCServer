import prisma from "../../prisma";
import { TrophyHistory } from "./types/job.types";
export async function getLatestTrophyHistory_clashyStats(gameTag: string) {
  try {
    const latestTrophyHistory = await prisma.trophyHistory.findFirst({
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

export async function getPlayersTrophyHistory_clashyStats(gameTag: string) {
  try {
    const latestTrophyHistory = await prisma.trophyHistory.findMany({
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

export async function addTrophyHistory_clashyStats(data: TrophyHistory) {
  try {
    const player = await prisma.trophyHistory.create({
      data: {
        gameTag: data.gameTag,
        trophies: data.trophies,
      },
    });

    return player;
  } catch (error) {
    console.error("Error while updating player:", error);
    throw error; // Rethrow the error for error handling
  }
}
