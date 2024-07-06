import {
  getClanWarLeagueGroup_superCell,
  getClanWarLeagueRoundMatch_superCell,
} from "../../../API/ClanWarLeague/clanWarLeague_Api";
import { onBoard_ClanAndMembers } from "../../../middlewares/Onboarding/clan_Onboarding";
import { getAllClans_clashyStats } from "../../../service/Clan/clan_service";
import {
  getClanWarLeagueGroup_clashyStats,
  storeClanWarLeagueGroupClan_ClashyStats,
  storeClanWarLeagueGroup_clashyStats,
  storeClanWarLeagueSeason_ClashyStats,
} from "../../../service/ClanWarLeague/clanWarLeague_service";
import { convertToCorrectDateObject } from "../../../utils/helpers/converToCorrectDateObj";
import { doesClanExist_clashyStats } from "../../../validation/Clan/doesClanExist";

//DAET-FNS FUNCTIONS
import { storeClanWarLeaguePastMatches } from "./storeClanWarLeaguePastMatches";
import {
  doesClanWarLeagueGroupExist_clashyStats,
  doesClanWarLeagueRoundExist_clashyStats,
} from "../../../validation/war/ClanWarLeague_validations";
import { addJob_collectClanWarLeagueData, logAndRemoveJobs } from "../../../Queues";

export async function checkIfClanWarLeagueIsActive() {
  const hadReasonArray: { clanTag: string; reason: string }[] = [];
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Lägg till 1 för att få rätt månad
  let groupID: number | undefined = 0;

  // Skapa ett nytt Date-objekt med 1-indexerad månad
  const allClans = await getAllClans_clashyStats();

  for (const clan of allClans) {
    console.log("🏷️ Clan Tag: ", clan.clanTag);
    const cwlGroup = await getClanWarLeagueGroup_superCell(clan.clanTag);

    if (cwlGroup?.reason) {
      hadReasonArray.push({ clanTag: clan.clanTag, reason: cwlGroup.reason });
      continue;
    }
    if (!cwlGroup) continue;
    console.log("🌕  cwlGroup: ", cwlGroup);

    //adding CWL group
    const clansCLWGroup = cwlGroup.clans.map((clan: { tag: string; name: string }) => ({
      tag: clan.tag,
      name: clan.name,
    }));

    for (const aClan of cwlGroup.clans) {
      console.log("🏡 aClan:", aClan.tag);
      const clanExit = await doesClanExist_clashyStats(aClan.tag);
      if (clanExit) continue;
      console.log("⭐ clanExit: ", clanExit);

      await onBoard_ClanAndMembers(aClan.tag);
    }

    console.log("👥 clansCLWGroup: ", clansCLWGroup);
    const { id: seasonID } = await storeClanWarLeagueSeason_ClashyStats(year, month);
    const cwlGroupExits = await doesClanWarLeagueGroupExist_clashyStats(seasonID);
    console.log("🚓 cwlGroupExits: ", cwlGroupExits);

    if (!cwlGroupExits) {
      const { id: idOfGroup } = await storeClanWarLeagueGroup_clashyStats(seasonID);
      groupID = idOfGroup;
      await storeClanWarLeagueGroupClan_ClashyStats(idOfGroup, clansCLWGroup);
    } else {
      const group = await getClanWarLeagueGroup_clashyStats(seasonID);
      groupID = group?.id;
      if (!groupID) continue;
    }
    console.log("groupID: ", groupID);

    // onBoard the clan and its members

    // 🍭 Looping over every round
    for (const [roundIndex, round] of cwlGroup.rounds.entries()) {
      let stopLoop = false;

      // 🍭 Looping over every wartag
      for (const warTag of round.warTags) {
        // 🚓 If we found #0 Matches haven´t been played
        if (warTag === "#0") {
          stopLoop = true;
          break;
        }

        const roundExist = await doesClanWarLeagueRoundExist_clashyStats(groupID, roundIndex);
        console.log("🚓 roundExist: ", roundExist);
        if (roundExist) continue;
        const cwlMatch = await getClanWarLeagueRoundMatch_superCell(warTag);

        console.log("🚓 cwlMatch: ", !!cwlMatch);
        if (!cwlMatch) continue;

        const roundEndTime = convertToCorrectDateObject(cwlMatch.endTime).fulldate;
        console.log("⏳ ROUND END TIME: ", roundEndTime);

        if (cwlMatch.state === "warEnded") {
          await storeClanWarLeaguePastMatches(groupID, roundIndex, cwlMatch.clan, cwlMatch.opponent);
          continue;
        }

        await addJob_collectClanWarLeagueData(groupID, roundIndex, clan.clanTag, roundEndTime, warTag);
      }
      if (stopLoop) break;
    }
  }
  console.log("🌈 hadReasonArray: ", hadReasonArray);
  // await logAndRemoveJobs("collectClanWarLeagueInfo");
}
