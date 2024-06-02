import prisma from "../../prisma";
import { PlayerProfilClashyStats } from "../../types/Player/PlayerObject.types";
import { addNewMemberProps } from "../../types/Register/Register.types";

export async function getPlayer_clashyClash(gameTag: string): Promise<PlayerProfilClashyStats | null> {
  try {
    const player = await prisma.user.findUnique({
      where: {
        gameTag: gameTag,
      },
    });

    return player;
  } catch (error) {
    console.error("Error while checking if clan exists:", error);
    throw error; // Rethrow the error for error handling
  }
}

export async function getAllPlayers_clashyStats() {
  try {
    const player = await prisma.user.findMany({
      select: {
        gameTag: true,
      },
    });

    return player;
  } catch (error) {
    console.error("Error while updating player:", error);
    throw error; // Rethrow the error for error handling
  }
}

export async function updatePlayer_clashyStats(playerObject: addNewMemberProps) {
  try {
    const player = await prisma.user.update({
      where: {
        gameTag: playerObject.gameTag,
      },
      data: playerObject,
    });

    return player;
  } catch (error) {
    console.error("Error while updating player:", error);
    throw error; // Rethrow the error for error handling
  }
}
