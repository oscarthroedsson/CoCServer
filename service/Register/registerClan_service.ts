import prisma from "../../prisma";
import { addNewClanProps } from "../../types/Register/Register.types";

export function registerClan_clashyStats(newClan: addNewClanProps) {
  return prisma.clan.create({
    data: {
      clanTag: newClan.tag,
      clanName: newClan.name,
      warWinLoseRatio: newClan.warWinLoseRatio,
    },
  });
}
