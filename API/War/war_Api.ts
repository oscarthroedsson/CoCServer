import { changeToURLencoding } from "../../utils/helpers/urlEncoding";

export async function isClanAtWar_superCell(clanTag: string) {
  const convertedClanTag = changeToURLencoding(clanTag); //change # to %23
  try {
    const response = await fetch(`https://cocproxy.royaleapi.dev/v1/clans/${convertedClanTag}/currentwar`, {
      headers: {
        Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
      },
    });
    const data = await response.json();
    if (data.state === "inWar") return data;
    return data;
  } catch (err) {
    console.log("🚨 ", err);
  }
}
