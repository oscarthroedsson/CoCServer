import { changeToURLencoding } from "../../utils/helpers/urlEncoding";
import prisma from "../../prisma";

/**
 * @param warTag
 * @param clanTag
 * @returns
 */
export async function doesCWLMatchExist_clashyStats(roundId: number, clanTag: string) {
  const convertedClanTag = changeToURLencoding(clanTag);
  try {
    const response = await prisma.clanWarLeagueMatch.findFirst({
      where: {
        roundId: roundId,
        clanOneTag: convertedClanTag,
      },
    });

    return !!response;
  } catch (error) {
    throw new Error(`Error while fetching clan war attack | Error: ${error} | fn: doesCWLMatchExist_clashyStats`);
  }
}
