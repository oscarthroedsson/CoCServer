export interface RegisterProps {
  gameId: string;
  email: string;
  acceptTerms: boolean;
}

export interface addNewMemberProps {
  gameTag: string;
  clanTag: string;
  gameName: string;
  email: string;
}
export interface addNewClanProps {
  tag: string;
  name: string;
  warWinLoseRatio: number;
}
