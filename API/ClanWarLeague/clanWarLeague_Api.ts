import { changeToURLencoding } from "../../utils/helpers/urlEncoding";

export async function getClanWarLeagueGroup_superCell(clanTag: string) {
  try {
    const convertedClanTag = changeToURLencoding(clanTag);

    console.log("convertedClanTag: ", convertedClanTag);
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
}

export async function getClanWarLeagueRoundMatch_superCell(warTag: string) {
  try {
    const convertedWarTag = changeToURLencoding(warTag);
    console.log("convertedClanTag: ", convertedWarTag);
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
