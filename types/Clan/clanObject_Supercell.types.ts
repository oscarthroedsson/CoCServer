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
  capialHallLeevel: number;
  districts: {
    id: number;
    name: string;
    districtHallLeveel: number;
  }[];
}
