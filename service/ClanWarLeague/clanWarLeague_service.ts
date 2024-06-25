import prisma from "../../prisma";

import { changeToURLencoding } from "../../utils/helpers/urlEncoding";
import { CwlMatchObject } from "../../models/types/cwlMatchObject.types";
import { Prisma } from "@prisma/client";

import { ClanWarLeagueAttack } from "../types/clanWarLeague.types";
import {
  ClanWarLeagueAttack_clashyClash,
  ClanWarLeagueGroup_clashyClash,
  ClanWarLeagueMatch_clashyClash,
} from "../../types/ClashyStats/clanWarLeague.types";

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

export async function storeClanWarLeagueGroup_clashyStats(
  year: number,
  month: number,
  clanTags: string[]
): Promise<ClanWarLeagueGroup_clashyClash | null | undefined> {
  if (clanTags.length === 0) {
    return;
  }

  //  Create a new group
  const newGroup = await prisma.clanWarLeagueGroup.create({
    data: {
      seasonYear: year,
      seasonMonth: month,
    },
  });

  const groupClansData = clanTags.map((clanTag: string) => ({
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

export async function getClanWarLeagueGroup_clashyStats(seasonYear: number, seasonMonth: number) {
  const group = await prisma.clanWarLeagueGroup.findFirst({
    where: {
      seasonYear: seasonYear,
      seasonMonth: seasonMonth,
    },
  });

  return group;
}

export async function storeClanWarLeagueGroupClan_clashyStats(clanTag: string, groupId: number) {
  try {
    const newClanWarLeagueGroupClan = await prisma.clanWarLeagueGroupClan.create({
      data: {
        clanTag: clanTag,
        groupId: groupId,
      },
    });
    console.log("New ClanWarLeagueGroupClan added:", newClanWarLeagueGroupClan);
    return newClanWarLeagueGroupClan;
  } catch (error) {
    console.error("Error adding ClanWarLeagueGroupClan:", error);
    throw error;
  }
}

export async function getClanWarLeagueGroupClan_clashyStats(clanTag: string) {
  try {
    const groupClan = await prisma.clanWarLeagueGroupClan.findFirst({
      where: {
        clanTag: clanTag,
      },
      include: {
        group: true, // Inkludera den relaterade gruppen
      },
    });

    return groupClan ? groupClan.group : null; // Returnera gruppen om den finns, annars null
  } catch (error) {
    console.error("Error while finding group with clan:", error);
    return null; // Returnera null vid fel
  }
}

export async function storeClanWarLeagueMatch_clashyStats(
  match: CwlMatchObject
): Promise<ClanWarLeagueMatch_clashyClash> {
  const { round, clanOneTag, clanTwoTag, clanOneStats, clanTwoStats, groupId, winner } = match;

  return await prisma.clanWarLeagueMatch.create({
    data: {
      groupId: groupId,
      round: round,
      clanOneTag: clanOneTag,
      clanTwoTag: clanTwoTag,
      clanOneStats: clanOneStats as unknown as Prisma.JsonObject,
      clanTwoStats: clanTwoStats as unknown as Prisma.JsonObject,
      winner: winner,
    },
  });
}

export async function getClanWarLeagueMatch_clashyStats(
  seasonYear: number,
  seasonMonth: number,
  clanOneTag: string,
  clanTwoTag: string
): Promise<ClanWarLeagueMatch_clashyClash | null> {
  // Hämta grupp-ID baserat på seasonYear och seasonMonth
  const group = await prisma.clanWarLeagueGroup.findFirst({
    where: {
      seasonYear: seasonYear,
      seasonMonth: seasonMonth,
    },
    select: {
      id: true,
    },
  });

  if (!group) {
    throw new Error("Group not found");
  }

  // Hämta matchen baserat på grupp-ID, clanOneTag och clanTwoTag
  const match = await prisma.clanWarLeagueMatch.findFirst({
    where: {
      groupId: group.id,
      clanOneTag: clanOneTag,
      clanTwoTag: clanTwoTag,
    },
  });

  return match;
}

export async function storeClanWarLeagueAttacks_clashyStats(attacks: ClanWarLeagueAttack_clashyClash) {
  return await prisma.clanWarLeagueAttack.create({
    data: {
      matchId: attacks.matchId,
      attackerPlayerTag: attacks.attackerPlayerTag,
      defenderPlayerTag: attacks.defenderPlayerTag,
      stars: attacks.stars,
      destructionPercentage: attacks.destructionPercentage,
      duration: attacks.duration,
      gotAttacked: attacks.gotAttacked,
    },
  });
}
