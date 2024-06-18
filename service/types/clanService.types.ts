export interface ClanMemberRecord {
  id?: number;
  clanTag: string;
  clanMembers: ClanMemberRecordObject[];
}

export type ClanMemberRecordObject = { gameTag: string; gameName: string };
