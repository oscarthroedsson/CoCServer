import prisma from "../../prisma";
import { DonationHistory } from "./types/job.types";

export async function getLatestDonationHistory_clashyStats(gameTag: string) {
  try {
    const latestTrophyHistory = await prisma.donationHistory.findFirst({
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

export async function getPlayersDonationHistory_clashyStats(gameTag: string) {
  try {
    const latestTrophyHistory = await prisma.donationHistory.findMany({
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

export async function addDonationHistory_clashyStats(data: DonationHistory) {
  try {
    const player = await prisma.donationHistory.create({
      data: {
        gameTag: data.tag,
        gameName: data.name,
        donations: data.donations,
        donationsReceived: data.donationsReceived,
        donationRatio: data.donationRatio,
        donerType: data.donerType,
      },
    });

    return player;
  } catch (error) {
    console.error("Error while updating player:", error);
    throw error; // Rethrow the error for error handling
  }
}
