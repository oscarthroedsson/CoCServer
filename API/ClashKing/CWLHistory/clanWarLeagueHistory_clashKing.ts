import { changeToURLencoding } from "../../../utils/helpers/urlEncoding";

export async function getCLWGroupHistory_ClashKing(clanTag: string, year: number, month: number | string) {
  const convertedClanTag = changeToURLencoding(clanTag); //change # to %23
  if (month.toString().length === 1) {
    month = "0" + month; // Hämtar andra tecknet (0-indexerat)
  }
  console.log("🚓 getCLWGroupHistory_ClashKing | convertedClanTag: ", convertedClanTag);
  console.log(`https://api.clashking.xyz/cwl/${convertedClanTag}/${year}-${month}`);

  const response = await fetch(`https://api.clashking.xyz/cwl/${convertedClanTag}/${year}-${month}`, {
    headers: {
      Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
    },
  });
  if (!response.ok) {
    console.error("❗❗ Error while fetching CWL group history", response.statusText);
    return null;
  }
  const data = await response.json();

  return data;
}
