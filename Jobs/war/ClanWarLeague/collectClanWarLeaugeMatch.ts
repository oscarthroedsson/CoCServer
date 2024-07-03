import { convertToCWLMatchObject } from "../../../models/convertToCWLMatchObjects";
import {
  storeClanWarLeagueGroupClan_ClashyStats,
  storeClanWarLeagueGroup_clashyStats,
  storeClanWarLeagueSeason_ClashyStats,
} from "../../../service/ClanWarLeague/clanWarLeague_service";
import { ClanWarLeagueMatchClanObject_Supercell } from "../../../types/Supercell/clanWarLeague.types";

export async function collectClanWarLeaugeMatch(
  clanTag: string,
  roundIndex: number,
  clan: ClanWarLeagueMatchClanObject_Supercell,
  opponent: ClanWarLeagueMatchClanObject_Supercell
) {
  if (!clanTag) return;
}
