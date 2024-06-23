import prisma from "../../prisma";
import { addNewMemberProps } from "../../types/Register/Register.types";

export function registerPlayer_clashyStats(newMember: addNewMemberProps) {
  if (!newMember.gameTag || !newMember.gameName) return;

  return prisma.user.create({
    data: {
      gameTag: newMember.gameTag,
      email: newMember.email,
      clanTag: newMember.clanTag,
      gameName: newMember.gameName,
    },
  });
}
