import { changeToURLencoding } from "../../utils/helpers/urlEncoding";
import prisma from "../../prisma";

/**
 * @param warTag
 * @param clanTag
 * @returns
 */
export async function doesCWLMatchExist_clashyStats(groupID: number, clanTag: string) {
  const convertedClanTag = changeToURLencoding(clanTag);
  const response = await prisma.clanWarLeagueMatch.findFirst({
    where: {
      groupId: groupID,
      clanOneTag: convertedClanTag,
    },
  });

  return !!response;
}
