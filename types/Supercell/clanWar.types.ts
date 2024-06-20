export interface ClanWarPlayerAttackObject_Supercell {
  attackerTag: string;
  defenderTag: string;
  stars: number;
  destructionPercentage: number;
  duration: number;
  gotAttacked: boolean;
}

export interface ClanWarObject_Supercell {
  state: string;
  teamSize: number;
  attacksPerMember: number;
  preparationStartTime: string;
  startTime: string;
  endTime: string;
  clan: {
    tag: string;
    name: string;
    clanLevel: number;
    attacks: number;
    stars: number;
    destructionPercentage: number;
    members: ClanWarMemberObject_Supercell[];
  };
  opponent: {
    tag: string;
    name: string;
    clanLevel: number;
    attacks: number;
    stars: number;
    destructionPercentage: number;
    members: ClanWarMemberObject_Supercell[];
  };
}

export interface ClanWarMemberObject_Supercell {
  tag: string;
  name: string;
  townhallLevel: number;
  mapPosition: number;
  attacks?: AttackObject_Supercell[];
  opponentAttacks: number;
  bestOpponentAttack?: AttackObject_Supercell;
}

export interface AttackObject_Supercell {
  attackerTag: string;
  defenderTag: string | null;
  stars: number;
  destructionPercentage: number;
  attacks: number;
  order: number;
  duration: number;
}
