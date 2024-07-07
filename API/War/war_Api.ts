import { changeToURLencoding } from "../../utils/helpers/urlEncoding";
import { WarLogData } from "../../types/Supercell/warLog.types";

/**
 * @description Check if the clan is in war or not
 * @param clanTag
 * @returns
 */
export async function isClanAtWar_superCell(clanTag: string) {
  const convertedClanTag = changeToURLencoding(clanTag); //change # to %23
  try {
    const response = await fetch(`https://cocproxy.royaleapi.dev/v1/clans/${convertedClanTag}/currentwar`, {
      headers: {
        Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(`Error while fetching clan war | clanTag: ${clanTag} | Error: ${err} | fn: isClanAtWar_superCell`);
  }
}

export async function getCurrentWar_superCell(clanTag: string) {
  const convertedClanTag = changeToURLencoding(clanTag); //change # to %23
  try {
    const response = await fetch(`https://cocproxy.royaleapi.dev/v1/clans/${convertedClanTag}/currentwar`, {
      headers: {
        Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(
      `Error while fetching current war | clanTag: ${clanTag} | Error: ${err} | fn: getCurrentWar_superCell`
    );
  }
}

export async function getClanWarLog_superCell(clanTag: string): Promise<WarLogData | undefined> {
  const convertedClanTag = changeToURLencoding(clanTag); //change # to %23

  try {
    const response = await fetch(`https://cocproxy.royaleapi.dev/v1/clans/${convertedClanTag}/warlog`, {
      headers: {
        Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(
      `Error while fetching clan war log | clanTag: ${clanTag} | Error: ${err} | fn: getClanWarLog_superCell`
    );
  }
}
