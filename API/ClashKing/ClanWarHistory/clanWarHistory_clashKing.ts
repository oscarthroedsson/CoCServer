import { changeToURLencoding } from "../../../utils/helpers/urlEncoding";

export async function getClanWarHistory_ClashKing(clanTag: string) {
  const convertedClanTag = changeToURLencoding(clanTag); //change # to %23
  const response = await fetch(`https://api.clashking.xyz/war/${convertedClanTag}/previous`, {
    headers: {
      Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
    },
  });
  const data = await response.json();

  return data;
}
