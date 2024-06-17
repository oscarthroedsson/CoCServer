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

    if (data.state !== "inWar") continue;

    const convertedTime = convertToCorrectDateObject(data.endTime);
    const timeToScheduleJob = new Date(convertedTime.getTime() - 5 * 60 * 1000); // 5min before war ends

    // ställ i kö
  }
}
