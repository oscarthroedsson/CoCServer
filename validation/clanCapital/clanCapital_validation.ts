import prisma from "../../prisma";

export async function doesCapitalRaidsExist_clashyClash(clanTag: string, month: number, year: number) {
  try {
    const foundClan = await prisma.capitalRaids.findFirst({
      where: {
        clanTag: clanTag,
        seasonMonth: month,
        seasonYear: year,
      },
    });
    return foundClan;
  } catch (error) {
    throw new Error(
      `Error while fetching clan capital raids | Error: ${error} | fn: doesCapitalRaidsExist_clashyClash`
    );
  }
}

export async function doesClanCapitalRaidExits_clashyClash(
  id: number,
  clanName: string,
  defender: string
): Promise<boolean> {
  try {
    const foundClan = await prisma.capitalRaid.findFirst({
      where: {
        id: id,
        clanName: clanName,
        defender: defender,
      },
    });
    return !!foundClan;
  } catch (error) {
    throw new Error(
      `Error while fetching clan capital raid | Error: ${error} | fn: doesClanCapitalRaidExits_clashyClash`
    );
  }
}

export async function doesClanCapitalDistrictsExist_clashyClash(id: number, district: string) {
  try {
    const foundDistrict = await prisma.capitalDistricts.findFirst({
      where: {
        capitalRaidId: id,
        district: district,
      },
    });

    return !!foundDistrict;
  } catch (error) {
    throw new Error(
      `Error while fetching clan capital districts | Error: ${error} | fn: doesClanCapitalDistrictsExist_clashyClash`
    );
  }
}

export async function doesCapitalDistrictAttacksExist_clashyClash(
  capitalDistrictsId: number,
  districtName: string,
  playerTag: string,
  attack: number,
  year: number,
  month: number
) {
  try {
    const foundAttack = await prisma.capitalDistrictAttacks.findFirst({
      where: {
        capitalDistrictsId: capitalDistrictsId,
        districtName: districtName,
        attack: attack,
        playerTag: playerTag,
        seasonYear: year,
        seasonMonth: month,
      },
    });
    return !!foundAttack;
  } catch (error) {
    throw new Error(
      `Error while fetching capital district attacks | Error: ${error} | fn: doesCapitalDistrictAttacksExist_clashyClash`
    );
  }
}
