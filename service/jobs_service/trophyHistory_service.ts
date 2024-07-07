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
    throw new Error(
      `Error while fetching latest trophy history | Error: ${error} | fn: getLatestTrophyHistory_clashyStats`
    );
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
    throw new Error(
      `Error while fetching latest trophy history | Error: ${error} | fn: getPlayersTrophyHistory_clashyStats`
    );
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
    throw new Error(`Error while updating player | Error: ${error} | fn: addTrophyHistory_clashyStats`);
  }
}
