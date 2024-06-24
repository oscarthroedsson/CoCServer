import prisma from "../../prisma";

export async function doesClanWarAttackExist_clashyStats(uniqueKeys: {
  matchId: number;
  attackerPlayerTag: string;
  defenderPlayerTag: string | null;
  attack: number;
}): Promise<boolean> {
  const clanWarAttack = await prisma.clanWarAttack.findFirst({
    where: {
      matchId: uniqueKeys.matchId,
      attackerPlayerTag: uniqueKeys.attackerPlayerTag,
      defenderPlayerTag: uniqueKeys.defenderPlayerTag,
      attack: uniqueKeys.attack,
    },
  });

  return !!clanWarAttack; // Returns true if clanWarAttack exists, false otherwises
}
