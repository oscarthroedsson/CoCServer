import prisma from "../../prisma";
import { addNewClanProps } from "../../types/Register/Register.types";

export function registerClan_clashyStats(newClan: addNewClanProps) {
  try {
    return prisma.clan.create({
      data: {
        clanTag: newClan.tag,
        clanName: newClan.name,
      },
    });
  } catch (error) {
    throw new Error(`Error while storing clan | Error: ${error} | fn: registerClan_clashyStats`);
  }
}
