export interface addNewMemberProps {
  gameTag: string;
  clanTag: string;
  gameName: string;
  email: string | null;
  acceptTerms: boolean;
}
export interface addNewClanProps {
  tag: string;
  name: string;
  warWinLoseRatio: number;
}
