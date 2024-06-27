import { changeToURLencoding } from "../../utils/helpers/urlEncoding";
import prisma from "../../prisma";

/**
 * @param warTag
 * @param clanTag
 * @returns
 */
export async function doesCWLMatchExist_clashyStats(roundId: number, clanTag: string) {
  const convertedClanTag = changeToURLencoding(clanTag);
  const response = await prisma.clanWarLeagueMatch.findFirst({
    where: {
      roundId: roundId,
      clanOneTag: convertedClanTag,
    },
  });

  return !!response;
}
