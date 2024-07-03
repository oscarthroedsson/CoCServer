import { getPlayer_superCell } from "../../API/Player/player_Api";
import { getAllPlayers_clashyStats } from "../../service/Player/player_service";
import {
  addClanCapitalContributions_clashyStats,
  getLatestClanCapitalContributions_clashyStats,
} from "../../service/jobs_service/clanCapitalContributions_service";

export async function job_clanCapitalContributionsHistory() {
  const playersTag = await getAllPlayers_clashyStats();

  for (const player of playersTag) {
    // get the latest contributions of the player
    const latestContributions = await getLatestClanCapitalContributions_clashyStats(player.gameTag);
    // get the player object from supercell for relevant total capital contributions
    const playerObject = await getPlayer_superCell(player.gameTag);

    if (latestContributions && latestContributions.capitalContributions !== null) {
      const seasonsContributions = playerObject.clanCapitalContributions - latestContributions.totalContributions;
      await addClanCapitalContributions_clashyStats({
        gameTag: player.gameTag,
        clanTag: playerObject.clan.tag,
        capitalContributions: seasonsContributions,
        totalContributions: playerObject.clanCapitalContributions,
      });
    } else {
      await addClanCapitalContributions_clashyStats({
        gameTag: player.gameTag,
        clanTag: playerObject.clan.tag,
        capitalContributions: null,
        totalContributions: playerObject.clanCapitalContributions,
      });
    }
  }
}
