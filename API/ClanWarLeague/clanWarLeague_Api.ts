import {
  onBoardClanAndMembers,
  onBoardClanMemberRegister,
  onBoardClanMembers,
} from "../../middlewares/Onboarding/clan_Onboarding";
import { getAllClans_clashyStats } from "../../service/Clan/clan_service";
import { changeToURLencoding } from "../../utils/helpers/urlEncoding";
import { isClanWarLeagueActive } from "../../validation/war/isClanWarLeagueActive";

export async function getClanWarLeagueGroup(clanTag: string) {
  try {
    const convertedClanTag = changeToURLencoding(clanTag);
    const response = await fetch(`https://cocproxy.royaleapi.dev/v1/clans/${convertedClanTag}/currentwar/leaguegroup`, {
      headers: {
        Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("❌ Error: ", err);
  }

  console.log("🏆 done");
}

export async function getClanWarLeagueRoundMatch(warTag: string) {
  try {
    const convertedWarTag = changeToURLencoding(warTag);
    const response = await fetch(`https://cocproxy.royaleapi.dev/v1/clanwarleagues/wars/${convertedWarTag}`, {
      headers: {
        Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("❌ Error: ", err);
  }
}
