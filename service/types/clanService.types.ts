export interface ClanMemberRecord {
  clanTag: string;
  clanMembers: ClanMemberRecordObject[];
}

export type ClanMemberRecordObject = { gameTag: string; gameName: string };
