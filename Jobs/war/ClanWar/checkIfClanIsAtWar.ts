import { isClanAtWar_superCell } from "../../../API/War/war_Api";
import { addJobb_collectClanWarData } from "../../../Queues";
import { onBoard_ClanAndMembers } from "../../../middlewares/Onboarding/clan_Onboarding";
import { getAllClans_clashyStats } from "../../../service/Clan/clan_service";
import { convertToCorrectDateObject } from "../../../utils/helpers/converToCorrectDateObj";
import { doesClanExist_clashyStats } from "../../../validation/Clan/doesClanExist";

/**
 *
 *  @description Checks if a clan is at war - if it is, we check end time and add a job to the queue that runs 5min before the war ends
 * @implements {addJobb_collectClanWarData} - Adds a job to the queue to collect clan war data
 */
export async function checkIfClanIsAtWar() {
  let count = 0;
  const tags = await getAllClans_clashyStats();
  if (tags.length === 0) return;

  for (const tag of tags) {
    count++;

    const clanWarData = await isClanAtWar_superCell(tag.clanTag);
    if (clanWarData.state !== "inWar" || clanWarData.state !== "preparation") continue;

    const endTime = convertToCorrectDateObject(clanWarData.endTime).fulldate;

    const clans = [clanWarData.clan, clanWarData.opponent];

    for (const clan of clans) {
      // check if we have both clans in DB, if not, add them and onboard members
      const clanExist = await doesClanExist_clashyStats(clan.tag);
      if (!clanExist) {
        onBoard_ClanAndMembers(clan.tag);
      }

      // add job to queue
      await addJobb_collectClanWarData(endTime, clan.tag);
    }
  }
}
