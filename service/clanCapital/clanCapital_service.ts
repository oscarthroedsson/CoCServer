import prisma from "../../prisma";

export async function storeClanCapitalRaids_clashyClash(
  clanData: { clanTag: string; clanName: string },
  season: { year: number; month: number },
  data: {
    capitalTotalLoot: number;
    raidsCompleted: number;
    totalAttacks: number;
    enemyDistrictsDestroyed: number;
    offensiveReward: number;
    defensiveReward: number;
    totalRaids: number;
  }
) {
  try {
    return await prisma.capitalRaids.create({
      data: {
        clanTag: clanData.clanTag,
        clanName: clanData.clanName,
        seasonYear: season.year,
        seasonMonth: season.month,
        capitalTotalLoot: data.capitalTotalLoot,
        raidsCompleted: data.raidsCompleted,
        totalAttacks: data.totalAttacks,
        enemyDistrictsDestroyed: data.enemyDistrictsDestroyed,
        offensiveReward: data.offensiveReward,
        defensiveReward: data.defensiveReward,
        totalRaids: data.totalRaids,
      },
    });
  } catch (e) {
    console.log("🚨 ERROR | storeClanCapitalRaids_clashyClash | ", e);
  }
}

export async function getClanCapitalRaids_clashyClash(clanTag: string, year: number, month: number) {
  try {
    return await prisma.capitalRaids.findFirst({
      where: {
        clanTag: clanTag,
        seasonYear: year,
        seasonMonth: month,
      },
    });
  } catch (e) {
    console.log("🚨 ERROR | getClanCapitalRaids_clashyClash | ", e);
  }
}

export async function storeClanCapitalRaid_clashyClash(
  id: number,
  index: number,
  raidData: {
    clanTag: string;
    clanName: string;
    defender: string;
  },
  data: {
    attacksMade: number;
    numOfDistricts: number;
    enemyDistrictsDestroyed: number;
  }
) {
  try {
    return await prisma.capitalRaid.create({
      data: {
        capitalRaidsId: id,
        raid: index,

        clanTag: raidData.clanTag,
        clanName: raidData.clanName,
        defender: raidData.defender,

        attacksMade: data.attacksMade,
        numOfDistricts: data.numOfDistricts,
        enemyDistrictsDestroyed: data.enemyDistrictsDestroyed,
      },
    });
  } catch (e) {
    console.log("🚨 ERROR | storeClanCapitalRaid_clashyClash | ", e);
  }
}

export async function storeCapitalRaidDistricts_clashyClash(data: {
  capitalRaidId: number;
  district: string;
  destructionPercent: number;
  attackCount: number;
  totalLooted: number;
}) {
  try {
    const result = await prisma.capitalDistricts.create({
      data: {
        capitalRaidId: data.capitalRaidId,
        district: data.district,
        destructionPercent: data.destructionPercent,
        attackCount: data.attackCount,
        totalLooted: data.totalLooted,
      },
    });
    return result;
  } catch (e) {
    console.log("🚨 ERROR storeCapitalRaidDistricts_clashyClash | ", e);
  }
}

export async function storeCapitalDistrictAttacks_clashyClash(
  data: { capitalDistrictsId: number; attack: number },
  gameData: {
    playerName: string;
    playerTag: string;
    districtName: string;
    destruction: number;
    starsReached: number;
  },
  season: {
    year: number;
    month: number;
  }
) {
  try {
    const result = await prisma.capitalDistrictAttacks.create({
      data: {
        capitalDistrictsId: data.capitalDistrictsId,
        attack: data.attack,
        playerName: gameData.playerName,
        playerTag: gameData.playerTag,
        districtName: gameData.districtName,
        destruction: gameData.destruction,
        starsReached: gameData.starsReached,
        seasonYear: season.year,
        seasonMonth: season.month,
      },
    });

    return result;
  } catch (e) {
    console.log("🚨 ERROR | storeCapitalDistrictAttacks_clashyClash | ", e);
  }
}
