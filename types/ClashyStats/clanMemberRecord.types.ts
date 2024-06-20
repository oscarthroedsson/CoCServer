export interface ClanMemberRecord {
  clanTag: string;
  clanMembers: any;
}

export interface ClanMemberRecordObject {
  gameTag: string;
  gameName: string;
}
export interface leaveAndJoinClanHistoryObject {
  id?: number;
  clanTag: string;
  data: {
    [key: string]: ClanHistoryEntry; // let us add unlimted keys as long they are strings and valu iss ClanHistoryEntry
  };
}

export interface ClanHistoryEntry {
  left: number;
  joined: number;
  membershipChanges: MemberShipChangesObject[];
}

export interface MemberShipChangesObject {
  gameTag: string;
  gameName: string;
  type: string;
  time: Date;
}
