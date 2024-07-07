import prisma from "../../prisma";

export async function doesPlayerExist_clashyStats(playerTag: string): Promise<boolean> {
  try {
    const clan = await prisma.user.findFirst({
      where: {
        gameTag: playerTag,
      },
    });
    return !!clan; // Returns true if clan exists, false otherwise
  } catch (error) {
    throw new Error(`Error while fetching player | Error: ${error} | fn: doesPlayerExist_clashyStats`);
  }
}
