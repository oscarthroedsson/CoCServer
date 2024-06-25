import { PlayerProfilClashyStats } from "../Player/PlayerObject.types";
import { Clan_clashyStats } from "./clan.types";

export interface ClanWarLeagueGroup_clashyClash {
  id?: number;
  seasonYear: number;
  seasonMonth: number;
  groupClans?: ClanWarLeagueGroupClan_clashyClash[];
  matches?: any;
}

export interface ClanWarLeagueGroupClan_clashyClash {
  id?: number;
  clanTag: string;
  group?: any;
  groupId: number;
  clan?: Clan_clashyStats;
}

export interface ClanWarLeagueMatch_clashyClash {
  id?: number;
  groupId: number;
  round: number;
  clanOneTag: string;
  clanTwoTag: string;
  clanOneStats: any; // prisma has  JSON, makes life easier to write any
  clanTwoStats: any; // prisma has JSON, makes life easier to write any
  winner: string;
  clanOne?: Clan_clashyStats;
  clanTwo?: Clan_clashyStats;
  group?: ClanWarLeagueGroup_clashyClash;
  attacks?: ClanWarLeagueAttack_clashyClash[];
}

export interface ClanWarLeagueAttack_clashyClash {
  id?: number;
  attackerPlayerTag: string;
  defenderPlayerTag?: string | null; // will be null if the player doesnt attack
  stars: number;
  destructionPercentage: number;
  duration: number;
  matchId: number;
  gotAttacked: boolean;
  attacker?: PlayerProfilClashyStats;
  defender?: PlayerProfilClashyStats;
  match?: ClanWarLeagueMatch_clashyClash;
}
