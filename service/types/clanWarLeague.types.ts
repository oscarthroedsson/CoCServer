import { User } from "@prisma/client";

export interface ClanWarLeagueMatch {
  warTag: string;
  clanTag: string;
  season: string;
  seasonYear: number;
  seasonMonth: number;
  startTime: string;
  endTime: string;
  round: number;
  teamSize: number;
  numOfAttacks: number;
  stars: number;
  attacks: string;
  destructionPercentage: number;
  winner: string;
  opponent: String;
  opponentsAttacks: string;
}

export interface ClanWarLeagueAttack {
  id?: number;
  attackerPlayerTag: string;
  defenderPlayerTag: string;
  stars: number;
  destructionPercentage: number;
  duration: number;
  matchId: number;
  gotAttacked: boolean;
  attacker?: User;
  defender?: User;
  match?: ClanWarLeagueMatch;
}
