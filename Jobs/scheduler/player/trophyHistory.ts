import { getPlayer_superCell } from "../../../API/Player/player_Api";
import { getAllPlayers_clashyStats } from "../../../service/Player/player_service";
import {
  addTrophyHistory_clashyStats,
  getLatestTrophyHistory_clashyStats,
} from "../../../service/jobs_service/trophyHistory_service";

export async function job_CollectrophyHistory(): Promise<void> {
  let number = 0;
  const playersTag = await getAllPlayers_clashyStats();

  for (const player of playersTag) {
    const latestTrophyHistory = await getLatestTrophyHistory_clashyStats(player.gameTag);
    const playerObject = await getPlayer_superCell(player.gameTag);

    if (playerObject && latestTrophyHistory?.trophies !== playerObject.trophies) {
      // Only  add new trophies if the trophies are different from last time, this eliminates that we add inactive players
      console.log("⇈ | New trophies added");
      await addTrophyHistory_clashyStats({ gameTag: player.gameTag, trophies: playerObject.trophies });
    }
  }
  console.log(`🏁 All is added | ${playersTag.length} was looped`);
}
