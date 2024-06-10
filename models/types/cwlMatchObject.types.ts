export interface CwlMatchObject {
  id?: number;
  round: number;
  clanOneTag: string;
  clanTwoTag: string;
  clanOneStats: CWLMatchPlayerStatsObject;
  clanTwoStats: CWLMatchPlayerStatsObject;
  groupId: number;
  winner: string;
}

export interface CWLMatchPlayerStatsObject {
  attacks: number;
  stars: number;
  destructionPercentage: number;
}
