export interface Supercell_CurrrentClanWarData {
  state: string;
  teamSize: number;
  attacksPerMember: number;
  startTime: string;
  endTime: string;
  clan: any;
  opponent: any;
}

export interface ClanWarMatchObject {
  seasonYear: number;
  seasonMonth: number;
  clanOneTag: string;
  clanTwoTag: string;
  clanOneStats: ClanWarClanStats;
  clanTwoStats: ClanWarClanStats;
  teamSize: number;
  winner: string;
}

export interface ClanWarClanStats {
  stars: number;
  attacks: number;
  attackPercentage: number;
  destructionPercentage: number;
}
