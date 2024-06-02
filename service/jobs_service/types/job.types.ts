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
