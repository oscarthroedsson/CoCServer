export interface ClanObject {
  tag: string;
  name: string;
  type: string;
  description: string;
  location: {
    id: number;
    name: string;
    isCountry: boolean;
    countryCode: string;
  };
  isFamilyFriendly: boolean;
  badgeUrls: {
    small: string;
    large: string;
    medium: string;
  };
  clanLevel: number;
  clanPoints: number;
  clanBuilderBasePoints: number;
  clanCapitalPoints: number;
  capitalLeague: {
    id: number;
    name: string;
  };
  requiredTrophies: number;
  warFrequency: string;
  warWinStreak: number;
  warWins: number;
  warTies: number;
  warLosses: number;
  isWarLogPublic: boolean;
  warLeague: {
    id: number;
    name: string;
  };
  members: number;
  memberList: MemberListObject_Supercell[];
  labels: LabelObject_Supercell[];
  requiredBuilderBaseTrophies: number;
  requiredTownhallLevel: number;
  clanCapital: ClanCapitalObject_Supercell;
  chatLanguage: {
    id: number;
    name: string;
    languageCode: string;
  };
}

export interface MemberListObject_Supercell {
  tag: string;
  name: string;
  role: string;
  townHallLevel: number;
  expLevel: number;
  league: {
    id: number;
    name: string;
    iconUrls: {
      small: string;
      tiny: string;
      medium: string;
    };
  };
  trophies: number;
  builderBaseTrophies: number;
  clanRank: number;
  previousClanRank: number;
  donations: number;
  donationsReceived: number;
  playerHouse?: {
    elements: {
      type: string;
      id: number;
    }[];
  };
  builderBaseLeague: {
    id: number;
    name: string;
  };
}

export interface LabelObject_Supercell {
  id: number;
  name: string;
  iconUrls: {
    small: string;
    medium: string;
  };
}
export interface ClanCapitalObject_Supercell {
  capialHallLevel: number;
  districts: {
    id: number;
    name: string;
    districtHallLeveel: number;
  }[];
}

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
