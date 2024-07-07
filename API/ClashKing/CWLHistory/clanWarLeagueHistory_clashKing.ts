import { changeToURLencoding } from "../../../utils/helpers/urlEncoding";

export async function getCLWGroupHistory_ClashKing(clanTag: string, year: number, month: number | string) {
  const convertedClanTag = changeToURLencoding(clanTag); //change # to %23

  // 📚 The month needs to be in format 01-09 if it is 10+ we do not do anything
  if (month.toString().length === 1) {
    month = "0" + month;
  }
  try {
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
  } catch (error) {
    throw new Error(
      `Error while fetching CLW group | clanTag: ${clanTag} | Error: ${error} | fn:getCLWGroupHistory_ClashKing`
    );
  }
}
