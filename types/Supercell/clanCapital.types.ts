export interface ClanCapitalRaid_superCell {
  state: string;
  startTime: string;
  endTime: string;
  capitalTotalLoot: number;
  raidsCompleted: number;
  totalAttacks: number;
  enemyDistrictsDestroyed: number;
  offensiveReward: number;
  defensiveReward: number;
  members: ClanCapitalSummaryPlayer_superCell[];
  attacks: string;
}

export interface ClanCapitalSummaryPlayer_superCell {
  tag: string;
  name: string;
  attacks: number;
  attackLimit: number;
  bonusAttackLimit: number;
  capitalResourcesLooted: number;
}

export interface ClanCapitalRaidAttacks_superCell {
  defender: ClanCapitalDefender_superCell;
  attackCount: number;
  districtCount: number;
  districtsDestroyed: number;
}

export interface ClanCapitalDefender_superCell {
  tag: string;
  name: string;
  level: number;
}

export interface ClanCapitalDistrictTakeDowns_superCell {
  id: number;
  name: string;
  districtHallLevel: number;
  destructionPercent: number;
  stars: number;
  attackCount: number;
  totalLooted: number;
  attacks: ClanCapitalDistrictAttack_superCell[];
}

export interface ClanCapitalDistrictAttack_superCell {
  attacker: { tag: string; name: string };
  destructionPercent: number;
  stars: number;
}
