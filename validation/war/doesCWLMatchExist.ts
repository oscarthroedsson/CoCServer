import { changeToURLencoding } from "../../utils/helpers/urlEncoding";
import prisma from "../../prisma";

/**
 * @param warTag
 * @param clanTag
 * @returns
 */
export async function doesCWLMatchExist_clashyStats(warTag: string, clanTag: string) {
  const convertedClanTag = changeToURLencoding(clanTag);
  const response = await prisma.clanWarLeagueMatch.findFirst({
    where: {
      warTag: warTag,
      clanTag: convertedClanTag,
    },
  });

  if (response) {
    return {
      status: true,
      data: response,
    };
  } else {
    return {
      status: false,
    };
  }
}
