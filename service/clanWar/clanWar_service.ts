import { Prisma } from "@prisma/client";
import { ClanWarAttackObject, ClanWarMatchObject } from "../../models/types/clanWarObject.types";
import prisma from "../../prisma";

/**
 * @Description Check if a clan war match object exists wih the clans tag on clanOneTag or clanTwoTag.
 * @Descirption Send in which season you want to check.
 * @param clanTag
 * @param startTime
 * @param endTime
 * @returns boolean
 */
//todo should move to validation 📁
export async function checkIfClansMatchObjectExist_clashyStats(
  clanOneTag: string,
  startTime: Date,
  endTime: Date
): Promise<boolean> {
  try {
    const matchObject = await prisma.clanWarMatch.findFirst({
      where: {
        clanOneTag: clanOneTag,
        startTime: startTime,
        endTime: endTime,
      },
    });

    return !!matchObject;
  } catch (error) {
    throw new Error(
      `Error while checking if clan war match object exists | Error: ${error} | fn: checkIfClansMatchObjectExist_clashyStats`
    );
  }
}

export async function storeClanWarMatch_clashyStats(matchObject: ClanWarMatchObject) {
  try {
    return await prisma.clanWarMatch.create({
      data: {
        seasonYear: matchObject.seasonYear,
        seasonMonth: matchObject.seasonMonth,
        startTime: matchObject.startTime,
        endTime: matchObject.endTime,
        clanOneTag: matchObject.clanOneTag,
        clanTwoTag: matchObject.clanTwoTag,
        clanOneStats: matchObject.clanOneStats as unknown as Prisma.JsonObject,
        clanTwoStats: matchObject.clanTwoStats as unknown as Prisma.JsonObject,
        teamSize: matchObject.teamSize,
        winner: matchObject.winner,
      },
    });
  } catch (error) {
    throw new Error(`Error while storing clan war match object | Error: ${error} | fn: storeClanWarMatch_clashyStats`);
  }
}
/**
 * @description param needs to be in a array, even if its only one object.
 * @description Create a clan war attack object in the database.
 * @param attacks[] array of ClanWarAttackObject
 * @returns
 */
export async function storeClanWarAttack_clashyStats(attack: ClanWarAttackObject) {
  try {
    return await prisma.clanWarAttack.create({
      data: {
        matchId: attack.matchId,
        attackerPlayerTag: attack.attackerPlayerTag,
        defenderPlayerTag: attack.defenderPlayerTag,
        stars: attack.stars,
        destructionPercentage: attack.destructionPercentage,
        duration: attack.duration,
        attacks: attack.attacks,
        attack: attack.attack,
        gotAttacked: attack.gotAttacked,
      },
    });
  } catch (error) {
    throw new Error(
      `Error while storing clan war attack object | Error: ${error} | fn: storeClanWarAttack_clashyStats`
    );
  }
}
