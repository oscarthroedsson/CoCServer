import { isClanAtWar_superCell } from "../../../API/War/war_Api";
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

    const data = await isClanAtWar_superCell(tag.clanTag);

    if (data.state !== "inWar" || data.state !== "preparation") continue;

    // check if opponent is in our DB B
    // → if not, add them to our DB and add a job on the clan manually so we also collect war info on them.

    // check if the job should be scheduled or we should collect data directly
    // → if the war ends in less than 5min, we should collect data directly
    // → if the war ends in more than 5min, we should schedule a job to collect data

    // const convertedTime = convertToCorrectDateObject(data.endTime);
    // const timeToScheduleJob = new Date(convertedTime.getTime() - 5 * 60 * 1000); // 5min before war ends
  }
}
