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
  id?: number;
  seasonYear: number;
  seasonMonth: number;
  clanOneTag: string;
  clanTwoTag: string;
  clanOneStats: ClanWarClanStats;
  clanTwoStats: ClanWarClanStats;
  teamSize: number;
  winner: string;
  attacks?: any[];
}

export interface ClanWarClanStats {
  stars: number;
  attacks: number;
  attackPercentage: number;
  destructionPercentage: number;
}

export interface ClanWarMatchObjectMemberList {
  tag: string;
  name: string;
  townhalllevel: number;
  mapPosition: number;
  attacks: ClanWarAttackObject[];
  opponentAttacks: number;
  bestOpponentAttack: ClanWarAttackObject;
}

export interface ClanWarAttackObject {
  matchId: number;
  attackerPlayerTag: string;
  defenderPlayerTag: string | null;
  stars: number;
  destructionPercentage: number;
  duration: number;
  attacks: number;
  gotAttacked: boolean;
}
