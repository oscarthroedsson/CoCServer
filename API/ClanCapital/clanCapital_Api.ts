import { ClanCapitalRaidResponse_superCell } from "../../types/Supercell/clanCapital.types";
import { changeToURLencoding } from "../../utils/helpers/urlEncoding";

export async function getClanCapital_superCell(clanTag: string): Promise<ClanCapitalRaidResponse_superCell> {
  const convertedClanTag = changeToURLencoding(clanTag);
  console.log("getClan_superCell |  convertedClanTag: ", convertedClanTag);

  const response = await fetch(`https://cocproxy.royaleapi.dev/v1/clans/${convertedClanTag}/capitalraidseasons`, {
    headers: {
      Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
    },
  });

  const data = await response.json();

  return data;
}
