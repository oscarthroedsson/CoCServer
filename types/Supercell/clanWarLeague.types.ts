export interface ClanWarLeagueMatchObject_Supercell {
  state: string;
  teamSize: number;
  preparationStartTime: string;
  startTime: string;
  endTime: string;
  clan: ClanWarLeagueMatchClanObject_Supercell;
  opponent: ClanWarLeagueMatchClanObject_Supercell;
}

export interface ClanWarLeagueMatchClanObject_Supercell {
  tag: string;
  name: string;
  badgeUrls: {
    small: string;
    large: string;
    medium: string;
  };
  clanLevel: number;
  attacks: number;
  stars: number;
  destructionPercentage: number;
  members: CWLMatchObjectMemberList_Supercell[];
}

export interface CWLMatchObjectMemberList_Supercell {
  tag: string;
  name: string;
  townhalllevel: number;
  mapPosition: number;
  attacks: CWLMatchObjectMemberListAttackObject_Supercell[];
  opponentAttacks: number;
  bestOpponentAttack: CWLMatchObjectMemberListAttackObject_Supercell;
}

export interface CWLMatchObjectMemberListAttackObject_Supercell {
  attackerTag: string;
  defenderTag: string;
  stars: number;
  destructionPercentage: number;
  order: number;
  duration: number;
}
