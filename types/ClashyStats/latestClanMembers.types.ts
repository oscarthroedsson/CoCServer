export interface ClanMemberHistoryObject {
  gameTag: string;
  gameName: string;
  type: string;
  time?: Date;
}

export interface LatestClanMembers {
  id?: number;
  clanTag: string;
  members: LatestClanMembersObject[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LatestClanMembersObject {
  gameTag: string;
  gameName: string;
}
