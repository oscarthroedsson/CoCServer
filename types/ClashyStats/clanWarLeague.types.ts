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
  roundId: number;
  round: number;
  clanOneData: { tag: string; name: string };
  clanTwoData: { tag: string; name: string };
  clanOneStats: Record<string, any>;
  // ClanWarLeagueMatchClanStats_clashyClash; // prisma has  JSON, makes life easier to write any
  clanTwoStats: Record<string, any>;
  // ClanWarLeagueMatchClanStats_clashyClash; // prisma has JSON, makes life easier to write any
  winner: string;
  clanOne?: Clan_clashyStats;
  clanTwo?: Clan_clashyStats;
  group?: ClanWarLeagueGroup_clashyClash;
  attacks?: ClanWarLeagueAttack_clashyClash[];
}

export interface ClanWarLeagueMatchClanStats_clashyClash {
  numOfAttacks: number;
  stars: number;
  destructionPercentage: number;
  attacks: ClanWarLeagueAttack_clashyClash[];
}

export interface ClanWarLeagueAttack_clashyClash {
  id?: number;
  attack: number;
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

export interface CLWGroupResponse_API {
  seasonYear: number;
  seasonMonth: number;
  clans: CLWGroupResponseClans_API[];
  rounds: { roundID: number; roundNumber: number; matches: CLWGroupResponseMatches_API[] }[];
}

export interface CLWGroupResponseClans_API {
  clanTag: string;
  clanName: string;
}

export interface CLWGroupResponseMatches_API {
  id: number;
  groupId: number;
  roundID: number;
  clanOne: { clanTag: string; clanName: string };
  clanTwo: { clanTag: string; clanName: string };
  clanOneStats: CLWGroupResponseClanStats_API;
  clanTwoStats: CLWGroupResponseClanStats_API;
  winner: string;
}

export interface CLWGroupResponseClanStats_API {
  stars: number;
  numOfAttacks: number;
  destructionPercentage: number;
  attacks: {
    stars: number;
    attack: number;
    matchId: number;
    duration: number;
    gotAttacked: boolean;
    attackerPlayerTag: string;
    defenderPlayerTag: string;
    destructionPercentage: number;
  }[];
}
