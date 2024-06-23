import prisma from "../../prisma";
import { changeToURLencoding } from "../../utils/helpers/urlEncoding";

export async function doesClanExist_clashyStats(clanTag: string): Promise<boolean> {
  console.log("clanTag: ", clanTag);
  const convertedClanTag = changeToURLencoding(clanTag);
  console.log("2. Checking if clan exists:", convertedClanTag);
  try {
    const clan = await prisma.clan.findUnique({
      where: {
        clanTag: convertedClanTag,
      },
    });

    return !!clan; // Returns true if clan exists, false otherwise
  } catch (error) {
    console.error("Error while checking if clan exists:", error);
    throw error; // Rethrow the error for error handling
  }
}
