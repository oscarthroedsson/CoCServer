import { getPlayer_superCell } from "../../API/Player/player_Api";
import { getAllPlayers_clashyStats } from "../../service/Player/player_service";
import {
  addClanCapitalContributions_clashyStats,
  getLatestClanCapitalContributions_clashyStats,
} from "../../service/jobs_service/clanCapitalContributions_service";

/*

*/
export async function job_clanCapitalContributionsHistory() {
  const playersTag = await getAllPlayers_clashyStats();

  for (const player of playersTag) {
    // get the latest contributions of the player
    const latestContributions = await getLatestClanCapitalContributions_clashyStats(player.gameTag);
    // get the player object from supercell for relevant total capital contributions
    const playerObject = await getPlayer_superCell(player.gameTag);

    /*
    📚 If latestContributions but capitalContributions is null it is the firts time we add data to this table for the user
    */
    if (latestContributions && latestContributions.capitalContributions !== null) {
      // Calculate the capital contributions for the season by subtracting the latest contributions from the total contributions
      const seasonsContributions = playerObject.clanCapitalContributions - latestContributions.totalContributions;
      await addClanCapitalContributions_clashyStats({
        gameTag: player.gameTag,
        clanTag: playerObject.clan.tag,
        capitalContributions: seasonsContributions,
        totalContributions: playerObject.clanCapitalContributions,
      });
    } else {
      // If the latestContributions is null, it is the first time we add data to this table for the user
      await addClanCapitalContributions_clashyStats({
        gameTag: player.gameTag,
        clanTag: playerObject.clan.tag,
        capitalContributions: null,
        totalContributions: playerObject.clanCapitalContributions,
      });
    }
  }
}
