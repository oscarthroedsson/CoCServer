import { getPlayer_superCell } from "../../../API/Player/player_Api";
import { getAllPlayers_clashyStats } from "../../../service/Player/player_service";
import {
  addDonationHistory_clashyStats,
  getLatestDonationHistory_clashyStats,
} from "../../../service/jobs_service/donationHistory_service";

import { donationPerson } from "../../../utils/constants/donationType";
import { calculateRatio } from "../../../utils/helpers/ratioCalculation";
import { notTheSameMonth } from "../../../validation/jobs/notTheSameMonth";

export async function job_CollectDonationHistory(): Promise<void> {
  console.log("schedule| Running job_CollectDonationHistory()");
  const playersTag = await getAllPlayers_clashyStats();

  for (const player of playersTag) {
    const playerObject = await getPlayer_superCell(player.gameTag);
    if (playerObject) {
      const latestDonationHistory = await getLatestDonationHistory_clashyStats(player.gameTag);

      if (notTheSameMonth(latestDonationHistory?.createdAt)) {
        console.log({
          tag: player.gameTag,
          name: playerObject.name,
          donations: playerObject.donations,
          donationsReceived: playerObject.donationsReceived,
          donationRatio: playerObject.donations / playerObject.donationsReceived,
          donerType: donationPerson(playerObject.donations / playerObject.donationsReceived),
        });

        addDonationHistory_clashyStats({
          tag: player.gameTag,
          name: playerObject.name,
          donations: playerObject.donations,
          donationsReceived: playerObject.donationsReceived,
          donationRatio: calculateRatio(playerObject.donations, playerObject.donationsReceived),
          donerType: donationPerson(playerObject.donations / playerObject.donationsReceived),
        });

        //todo add to total donations on user object
      }
    }
  }
}
