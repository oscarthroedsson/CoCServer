/*
# Any means that  we should build a new interface for it. 
*/

export interface ClanCapitalRaidResponse_superCell {
  items: ClanCapitalRaid_superCell[];
}

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
  members: ClanCapitalMembers_superCell[];
  attackLog: ClanCapitalAttackLog_superCell[];
  defenseLog: any;
}

/* 🔑 Members Key on the response */
export interface ClanCapitalMembers_superCell {
  tag: string;
  name: string;
  attacks: number;
  attackLimit: number;
  bonusAttackLimit: number;
  capitalResourcesLooted: number;
}

export interface ClanCapitalAttackLog_superCell {
  defender: ClanCapitalDefender_superCell;
  attackCount: number;
  districtCount: number;
  districtsDestroyed: number;
  districts: ClanCapitalDistricts_superSell[];
}

export interface ClanCapitalDistrictAttack_superCell {
  attacker: { tag: string; name: string };
  destructionPercent: number;
  stars: number;
}

/*
🔑 DefendeLog Key on the response
*/

export interface ClanCapitalDefenseLog_superCell {
  attacker: ClanCapitalDefender_superCell;
  attackCount: number;
  districtCount: number;
  districtsDestroyed: number;
  districts: ClanCapitalDistricts_superSell;
}

/* 🔑 Exist on multiple keys in the respone */
export interface ClanCapitalDistricts_superSell {
  id: number;
  name: string;
  districtHallLevel: number;
  destructionPercent: number;
  stars: number;
  attackCount: number;
  totalLooted: number;
  attacks: ClanCapitalDistrictAttack_superCell[];
}
export interface ClanCapitalDefender_superCell {
  tag: string;
  name: string;
  level: number;
}
