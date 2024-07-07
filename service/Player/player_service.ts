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
    throw new Error(`Error while fetching player | Error: ${error} | fn: getPlayer_clashyClash`);
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
    throw new Error(`Error while fetching player | Error: ${error} | fn: getAllPlayers_clashyStats`);
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
    throw new Error(`Error while updating player | Error: ${error} | fn: updatePlayer_clashyStats`);
  }
}

export function storePlayer_clashyStats(playerObject: PlayerProfilClashyStats) {
  try {
    return prisma.user.create({
      data: {
        gameTag: playerObject.gameTag,
        gameName: playerObject.gameName,
        clanTag: playerObject.clanTag,
        email: playerObject.email,
        acceptTerms: playerObject.acceptTerms,
      },
    });
  } catch (error) {
    throw new Error(`Error while storing player | Error: ${error} | fn: storePlayer_clashyStats`);
  }
}
