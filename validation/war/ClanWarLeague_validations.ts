import prisma from "../../prisma";

export async function doesClanWarLeagueGroupExist_clashyStats(year: number, month: number) {
  const response = await prisma.clanWarLeagueGroup.findFirst({
    where: {
      seasonYear: year,
      seasonMonth: month,
    },
  });

  if (response) {
    return {
      status: true,
      data: response,
    };
  } else {
    return {
      status: false,
    };
  }
}
