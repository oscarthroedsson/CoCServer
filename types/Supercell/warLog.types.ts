export interface WarLogData {
  items: (WarLog_ClanWarHistory | WarLog_ClanWarLeagueHistory)[];
}

export interface WarLog_ClanWarHistory {
  result: string;
  endTime: string;
  startTime: string;
  teamSize: number;
  attacksPerMember: number;
  battleModifier: string;
  clan: {
    tag: string;
    name: string;
    badgeUrls: { small: string; large: string; medium: string };
    clanLevel: number;
    attacks: number;
    stars: number;
    destructionPercentage: number;
  };
  opponent: {
    tag: string;
    name: string;
    badgeUrls: { small: string; large: string; medium: string };
    clanLevel: number;
    attacks: number;
    stars: number;
    destructionPercentage: number;
  };
}

export interface WarLog_ClanWarLeagueHistory {
  result: null;
  endTime: string;
  teamSize: number;
  attacksPerMember: number;
  battleModifier: string;
  clan: {
    tag: string;
    name: string;
    badgeUrls: { small: string; large: string; medium: string };
    clanLevel: number;
    attacks: number;
    stars: number;
    destructionPercentage: number;
    expEarned: number;
  };
  opponent: {
    tag: string;
    name: string;
    badgeUrls: { small: string; large: string; medium: string };
    clanLevel: number;
    stars: number;
    destructionPercentage: number;
  };
}
