import { MemberShipChangesObject } from "../types/ClashyStats/clanMemberRecord.types";

export const convertToLeaveAndJoinClanObject = (
  gameName: string,
  gameTag: string,
  type: string
): MemberShipChangesObject => {
  return {
    gameTag: gameTag,
    gameName: gameName,
    type: type,
    time: new Date(),
  };
};
