import prisma from "../../prisma";

export async function doesCapitalRaidsExist_clashyClash(clanTag: string, month: number, year: number) {
  const foundClan = await prisma.capitalRaids.findFirst({
    where: {
      clanTag: clanTag,
      seasonMonth: month,
      seasonYear: year,
    },
  });
  return foundClan;
}

export async function doesClanCapitalRaidExits_clashyClash(
  id: number,
  clanName: string,
  defender: string
): Promise<boolean> {
  const foundClan = await prisma.capitalRaid.findUnique({
    where: {
      id: id,
      clanName: clanName,
      defender: defender,
    },
  });
  return !!foundClan;
}

export async function doesClanCapitalDistrictsExist_clashyClash(id: number, district: string) {
  const foundDistrict = await prisma.capitalDistricts.findFirst({
    where: {
      capitalRaidId: id,
      district: district,
    },
  });

  return !!foundDistrict;
}

export async function doesCapitalDistrictAttacksExist_clashyClash(
  capitalDistrictsId: number,
  districtName: string,
  playerTag: string,
  attack: number,
  year: number,
  month: number
) {
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
}
