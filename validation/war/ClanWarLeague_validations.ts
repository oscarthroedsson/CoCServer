import prisma from "../../prisma";

export async function doesClanWarLeagueGroupExist_clashyStats(seasonId: number) {
  try {
    const response = await prisma.clanWarLeagueGroup.findFirst({
      where: {
        seasonId: seasonId,
      },
    });

    return !!response;
  } catch (error) {
    throw new Error(
      `Error while fetching clan war league group | Error: ${error} | fn: doesClanWarLeagueGroupExist_clashyStats`
    );
  }
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
    // can not implement error handling here, since I don´t understand TS enough, lol 😅
    return null; // Returnera null vid fel
  }
}

export async function doesClanWarLeagueRoundExist_clashyStats(groupID: number, roundNumber: number) {
  try {
    const round = await prisma.clanWarLeagueRound.findFirst({
      where: {
        groupId: groupID,
        roundNumber: roundNumber,
      },
    });

    return !!round;
  } catch (error) {
    throw new Error(
      `Error while fetching clan war league round | Error: ${error} | fn: doesClanWarLeagueRoundExist_clashyStats`
    );
  }
}

export async function doesClanWarLeagueMatchExist_clashyStats(uniqueKeys: { clanOneTag: string; clanTwoTag: string }) {
  try {
    const match = await prisma.clanWarLeagueMatch.findFirst({
      where: {
        clanOneTag: uniqueKeys.clanOneTag,
        clanTwoTag: uniqueKeys.clanTwoTag,
      },
    });
    return !!match;
  } catch (error) {
    throw new Error(
      `Error while fetching clan war league match | Error: ${error} | fn: doesClanWarLeagueMatchExist_clashyStats`
    );
  }
}

export async function doesClanWarLeagueAttackExist_clashyStats(
  matchId: number,
  attacker: string,
  defender: string | null
) {
  try {
    const attack = await prisma.clanWarAttack.findFirst({
      where: {
        matchId: matchId,
        attackerPlayerTag: attacker,
        defenderPlayerTag: defender ?? null, // Optional chaining in case defenderPlayerTag is undefined
      },
    });

    return !!attack;
  } catch (error) {
    throw new Error(
      `Error while fetching clan war league attack | Error: ${error} | fn: doesClanWarLeagueAttackExist_clashyStats`
    );
  }
}
