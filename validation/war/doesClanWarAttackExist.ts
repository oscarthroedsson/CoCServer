import prisma from "../../prisma";

export async function doesClanWarAttackExist_clashyStats(uniqueKeys: {
  matchId: number;
  attackerPlayerTag: string;
  defenderPlayerTag: string | null;
  attack: number;
}): Promise<boolean> {
  try {
    const clanWarAttack = await prisma.clanWarAttack.findFirst({
      where: {
        matchId: uniqueKeys.matchId,
        attackerPlayerTag: uniqueKeys.attackerPlayerTag,
        defenderPlayerTag: uniqueKeys.defenderPlayerTag,
        attack: uniqueKeys.attack,
      },
    });

    return !!clanWarAttack; // Returns true if clanWarAttack exists, false otherwises
  } catch (error) {
    throw new Error(`Errorr while fetching clan war attack | Error: ${error} | fn: doesClanWarAttackExist_clashyStats`);
  }
}
