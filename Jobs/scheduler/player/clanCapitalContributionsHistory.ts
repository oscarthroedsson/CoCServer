import { getAllPlayers_clashyStats } from "../../../service/Player/player_service";

export async function clanCapitalContributionsHistory() {
  const playersTag = await getAllPlayers_clashyStats();
}
