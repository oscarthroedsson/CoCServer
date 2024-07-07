import prisma from "../../prisma";
import { changeToURLencoding } from "../../utils/helpers/urlEncoding";

export async function doesClanExist_clashyStats(clanTag: string): Promise<boolean> {
  try {
    const clan = await prisma.clan.findFirst({
      where: {
        clanTag: clanTag,
      },
    });

    return !!clan; // Returns true if clan exists, false otherwise
  } catch (error) {
    throw new Error(`Erorr while fetching clan | Error: ${error} | fn: doesClanExist_clashyStats`);
  }
}
