import prisma from "../../prisma";

export async function doesClanWarLeagueGroupExist_clashyStats(seasonId: number) {
  const response = await prisma.clanWarLeagueGroup.findFirst({
    where: {
      seasonId: seasonId,
    },
  });

  return !!response;
}

export async function doesClanWarLeagueGroupClanExist_clashyStats(clanTag: string) {
  try {
    const groupClan = await prisma.clanWarLeagueGroupClan.findFirst({
      where: {
        clanTag: clanTag,
      },
      include: {
        group: true, // Inkludera den relaterade gruppen
      },
    });

    return !!groupClan;
  } catch (error) {
    console.error("Error while finding group with clan:", error);
    return null; // Returnera null vid fel
  }
}

export async function doesClanWarLeagueMatchExist_clashyStats(uniqueKeys: { clanOneTag: string; clanTwoTag: string }) {
  const match = await prisma.clanWarLeagueMatch.findFirst({
    where: {
      clanOneTag: uniqueKeys.clanOneTag,
      clanTwoTag: uniqueKeys.clanTwoTag,
    },
  });
  return !!match;
}

export async function doesClanWarLeagueAttackExist_clashyStats(
  matchId: number,
  attacker: string,
  defender: string | null
) {
  const attack = await prisma.clanWarAttack.findFirst({
    where: {
      matchId: matchId,
      attackerPlayerTag: attacker,
      defenderPlayerTag: defender ?? null, // Optional chaining in case defenderPlayerTag is undefined
    },
  });

  return !!attack;
}
