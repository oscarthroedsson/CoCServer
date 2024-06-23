export interface ClanCapital_clashyStats {
  id?: number;
  clanTag: string;
  clanName: string;
  clan: string;
  totalRaids: number;
  raids?: ClanCapitalRaid_clashyStats[];
}

export interface ClanCapitalRaid_clashyStats {
  id?: number;
  clanTag: string;
  clanName: string;
  enemyDistrictsDestroyed: number;
  raidsCompleted: number;
  offensiveReward: number;
  defensiveReward: number;
  defender: string;
  seasonYear: number;
  seasonMonth: number;
  raid: number;
  numberOfAttacks: number;
  attacks: ClanCapitalRaidsAttack_clashyStats[];
  capitalRaidsId: number;
}

export interface ClanCapitalRaidsAttack_clashyStats {
  id?: number;
  playerName: string;
  playerTag: string;
  district: string;
  destruction: number;
  starsReached: number;
  seasonYear: number;
  seasonMonth: number;
  capitalRaidId: number;
}
