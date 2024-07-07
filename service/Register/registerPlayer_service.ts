import prisma from "../../prisma";
import { addNewMemberProps } from "../../types/Register/Register.types";

export function registerPlayer_clashyStats(newMember: addNewMemberProps) {
  if (!newMember.gameTag || !newMember.gameName) return;

  try {
    return prisma.user.create({
      data: {
        gameTag: newMember.gameTag,
        email: newMember.email,
        clanTag: newMember.clanTag,
        gameName: newMember.gameName,
      },
    });
  } catch (error) {
    throw new Error(`Error while storing player | Error: ${error} | fn: registerPlayer_clashyStats`);
  }
}
