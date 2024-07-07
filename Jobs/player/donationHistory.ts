import { getPlayer_superCell } from "../../API/Player/player_Api";
import { getAllPlayers_clashyStats } from "../../service/Player/player_service";
import {
  addDonationHistory_clashyStats,
  getLatestDonationHistory_clashyStats,
} from "../../service/jobs_service/donationHistory_service";
import { donationPerson } from "../../utils/constants/donationType";
import { calculateRatio } from "../../utils/helpers/ratioCalculation";
import { notTheSameMonth } from "../../validation/jobs/notTheSameMonth";

/**
 * @description This job will collect the donation history of all the players in the clan
  and store it in the database. The job will run once a month.
 */
export async function job_CollectDonationHistory(): Promise<void> {
  const playersTag = await getAllPlayers_clashyStats();

  for (const player of playersTag) {
    const playerObject = await getPlayer_superCell(player.gameTag);
    if (playerObject) {
      const latestDonationHistory = await getLatestDonationHistory_clashyStats(player.gameTag);
      if (notTheSameMonth(latestDonationHistory?.createdAt)) {
        addDonationHistory_clashyStats({
          tag: player.gameTag,
          name: playerObject.name,
          donations: playerObject.donations,
          donationsReceived: playerObject.donationsReceived,
          donationRatio: calculateRatio(playerObject.donations, playerObject.donationsReceived),
          donerType: donationPerson(playerObject.donations / playerObject.donationsReceived),
        });
      }
    }
  }
}
