import { changeToURLencoding } from "../../../utils/helpers/urlEncoding";

export async function getClanWarHistory_ClashKing(clanTag: string) {
  console.log("🚂 Collect clan war history");
  try {
    const convertedClanTag = changeToURLencoding(clanTag); //change # to %23
    const response = await fetch(`https://api.clashking.xyz/war/${convertedClanTag}/previous`, {
      headers: {
        Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
      },
    });
    const data = await response.json();

    return data;
  } catch (e) {
    throw new Error(
      `Error while fetching clan war history | clanTag: ${clanTag} | Error: ${e} | fn:getClanWarHistory_ClashKing`
    );
  }
}
