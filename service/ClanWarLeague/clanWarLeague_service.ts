import { changeToURLencoding } from "../../utils/helpers/urlEncoding";

import { CwlMatchObject } from "../../models/types/cwlMatchObject.types";
import { Prisma } from "@prisma/client";
import prisma from "../../prisma";
import { ClanWarLeagueAttack } from "../types/clanWarLeague.types";

// export async function getClanWarLeagueMatchs_clashyStats(warTag: string, clanTag: string) {
//   const convertedClanTag = changeToURLencoding(clanTag);
//   const response = await prisma.clanWarLeagueMatch.findMany({
//     where: {
//       clanTag: "",
//       seasonYear: 2023,
//       seasonMonth: 06,
//       warTag: warTag,
//       clanTag: convertedClanTag,
//     },
//   });
// }

export async function storeClanWarLeagueGroup_clashyStats(year: number, month: number, clans: string[]) {
  if (clans.length === 0) {
    return;
  }

  //  Create a new group
  const newGroup = await prisma.clanWarLeagueGroup.create({
    data: {
      seasonYear: year,
      seasonMonth: month,
    },
  });

  const groupClansData = clans.map((clanTag: string) => ({
    clanTag: clanTag,
    groupId: newGroup.id,
  }));

  // Lägg till alla klaner i gruppen i en transaktion
  await prisma.$transaction(
    groupClansData.map((data) =>
      prisma.clanWarLeagueGroupClan.create({
        data: data,
      })
    )
  );
  if (newGroup.id === undefined) throw new Error("newGroup.id is undefined");
  return newGroup;
}

export async function storeClanWarLeagueMatch_clashyStats(match: CwlMatchObject) {
  const { id, round, clanOneTag, clanTwoTag, clanOneStats, clanTwoStats, groupId, winner } = match;

  return await prisma.clanWarLeagueMatch.create({
    data: {
      round: round,
      clanOneTag: clanOneTag,
      clanTwoTag: clanTwoTag,
      groupId: groupId,
      winner: winner,
      clanOneStats: clanOneStats as unknown as Prisma.JsonObject,
      clanTwoStats: clanTwoStats as unknown as Prisma.JsonObject,
    },
  });
}

export async function storeClanWarLeagueAttacks_clashyStats(attacks: ClanWarLeagueAttack[]) {
  return await prisma.clanWarLeagueAttack.createMany({
    data: attacks,
  });
}
