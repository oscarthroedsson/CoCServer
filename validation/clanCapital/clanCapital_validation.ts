import prisma from "../../prisma";

export async function doesCapitalRaidsExist_clashyClash(clanTag: string, month: number, year: number) {
  const foundClan = await prisma.capitalRaids.findUnique({
    where: {
      clanTag: clanTag,
      seasonMonth: month,
      seasonYear: year,
    },
  });
  return !!foundClan;
}
