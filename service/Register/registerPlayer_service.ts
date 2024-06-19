import prisma from "../../prisma";
import { addNewMemberProps } from "../../types/Register/Register.types";

export function registerPlayer_clashyStats(newMember: addNewMemberProps) {
  console.log("🎍 2. New member: ", newMember);
  return prisma.user.create({
    data: {
      gameTag: newMember.gameTag,
      email: newMember.email,
      clanTag: newMember.clanTag,
      gameName: newMember.gameName,
    },
  });
}
