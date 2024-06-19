import prisma from "../../prisma";

export async function doesClanExist_clashyStats(clanTag: string): Promise<boolean> {
  console.log("2. Checking if clan exists:", clanTag);
  try {
    const clan = await prisma.clan.findUnique({
      where: {
        clanTag: clanTag,
      },
    });

    return !!clan; // Returns true if clan exists, false otherwise
  } catch (error) {
    console.error("Error while checking if clan exists:", error);
    throw error; // Rethrow the error for error handling
  }
}
