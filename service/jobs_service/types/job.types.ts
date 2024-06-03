export interface TrophyHistory {
  gameTag: string;
  trophies: number;
}

export interface DonationHistory {
  tag: string;
  name: string;
  donations: number;
  donationsReceived: number;
  donationRatio: number;
  donerType: string;
}

export interface ClanCapitalContributions {
  gameTag: string;
  clanTag: string;
  capitalContributions: number | null;
  totalContributions: number;
}
