import { Prisma } from "@prisma/client";
import { ClanWarAttackObject, ClanWarMatchObject } from "../../models/types/clanWarObject.types";
import prisma from "../../prisma";

/**
 * @Description Check if a clan war match object exists wih the clans tag on clanOneTag or clanTwoTag.
 * @Descirption Send in which season you want to check.
 * @param clanTag
 * @param seasonYear
 * @param seasonMonth
 * @returns boolean
 */
export async function checkIfClansMatchObjectExist_clashyStats(
  clanTag: string,
  seasonYear: number,
  seasonMonth: number
): Promise<boolean> {
  const matchObject = await prisma.clanWarMatch.findFirst({
    where: {
      seasonYear: seasonYear,
      seasonMonth: seasonMonth,
      OR: [{ clanOneTag: clanTag }, { clanTwoTag: clanTag }],
    },
  });

  return !!matchObject;
}

export async function createClanWarMatch_clashyStats(matchObject: ClanWarMatchObject) {
  return await prisma.clanWarMatch.create({
    data: {
      seasonYear: matchObject.seasonYear,
      seasonMonth: matchObject.seasonMonth,
      clanOneTag: matchObject.clanOneTag,
      clanTwoTag: matchObject.clanTwoTag,
      clanOneStats: matchObject.clanOneStats as unknown as Prisma.JsonObject,
      clanTwoStats: matchObject.clanTwoStats as unknown as Prisma.JsonObject,
      teamSize: matchObject.teamSize,
      winner: matchObject.winner,
    },
  });
}
/**
 * @description param needs to be in a array, even if its only one object.
 * @description Create a clan war attack object in the database.
 * @param attacks[] array of ClanWarAttackObject
 * @returns
 */
export async function storeClanWarAttack_clashyStats(attacks: ClanWarAttackObject[]) {
  return await prisma.clanWarAttack.createMany({
    data: attacks.map((attack) => ({
      matchId: attack.matchId,
      attackerPlayerTag: attack.attackerPlayerTag,
      defenderPlayerTag: attack.defenderPlayerTag,
      stars: attack.stars,
      destructionPercentage: attack.destructionPercentage,
      duration: attack.duration,
      attacks: attack.attacks,
      gotAttacked: attack.gotAttacked,
    })),
  });
}
