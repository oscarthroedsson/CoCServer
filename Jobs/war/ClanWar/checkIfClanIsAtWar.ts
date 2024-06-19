import { isClanAtWar_superCell } from "../../../API/War/war_Api";
import { addJobb_collectClanWarData } from "../../../Queues";
import { onBoardClanAndMembers } from "../../../middlewares/Onboarding/clan_Onboarding";
import { getAllClans_clashyStats } from "../../../service/Clan/clan_service";
import { convertToCorrectDateObject } from "../../../utils/helpers/converToCorrectDateObj";
import { doesClanExist_clashyStats } from "../../../validation/Clan/doesClanExist";

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

    const clans = [clanWarData.clan, clanWarData.opponent];

    for (const clan of clans) {
      // check if we have both clans in DB, if not, add them and onboard members
      const clanExist = await doesClanExist_clashyStats(clan.tag);
      if (!clanExist) {
        console.log("🚢 Onboarding Clan And Members");
        onBoardClanAndMembers({ tag: clan.tag, name: clan.name, members: clan.members });
      }

      // add job to queue
      await addJobb_collectClanWarData(endTime, clan.tag);
    }
  }
}
