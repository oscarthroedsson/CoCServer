import { changeToURLencoding } from "../../utils/helpers/urlEncoding";

export async function isClanWarLeagueActive_superCell(clanTag: string) {
  const convertedClanTag = changeToURLencoding(clanTag);
  const response = await fetch(`https://cocproxy.royaleapi.dev/v1/clans/${convertedClanTag}/currentwar/leaguegroup`, {
    headers: {
      Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
    },
  });
  const data = await response.json();

  if (data) {
    return {
      status: true,
      data: data,
    };
  } else {
    return {
      status: false,
    };
  }
}
