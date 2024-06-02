import prisma from "../../prisma";

export async function doesPlayerExist_clashyStats(clanTag: string): Promise<boolean> {
  try {
    const clan = await prisma.user.findUnique({
      where: {
        gameTag: clanTag,
      },
    });

    return !!clan; // Returns true if clan exists, false otherwise
  } catch (error) {
    console.error("Error while checking if clan exists:", error);
    throw error; // Rethrow the error for error handling
  }
}
