import { isClanAtWar_superCell } from "../../../API/War/war_Api";
import { addJobb_collectClanWarData } from "../../../Queues";
import { getAllClans_clashyStats } from "../../../service/Clan/clan_service";
import { convertToCorrectDateObject } from "../../../utils/helpers/converToCorrectDateObj";

export async function checkIfClanIsAtWar() {
  let count = 0;
  const tags = await getAllClans_clashyStats();
  console.log("num of clans: ", tags.length);
  if (tags.length === 0) return;
  for (const tag of tags) {
    console.log("checking:", count);
    count++;

    const clanWarData = await isClanAtWar_superCell(tag.clanTag);
    if (clanWarData.state !== "inWar" || clanWarData.state !== "preparation") continue;

    const endTime = convertToCorrectDateObject(clanWarData.endTime).fulldate;

    // scheduale job for both the clan and the opponent
    [clanWarData.clan, clanWarData.opponent].forEach(async (clan) => {
      // todo | Validate if the clans exits and if not, collect save clan and their members to our DB

      await addJobb_collectClanWarData(endTime, clan.tag);
    });

    // check if opponent is in our DB B
    // → if not, add them to our DB and add a job on the clan manually so we also collect war info on them.

    // check if the job should be scheduled or we should collect data directly
    // → if the war ends in less than 5min, we should collect data directly
    // → if the war ends in more than 5min, we should schedule a job to collect data

    // const convertedTime = convertToCorrectDateObject(data.endTime);
    // const timeToScheduleJob = new Date(convertedTime.getTime() - 5 * 60 * 1000); // 5min before war ends
  }
}
