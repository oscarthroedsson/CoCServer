import { doesClanExist_clashyStats } from "../../validation/Clan/doesClanExist";

export async function clanOnboarding(clanTag: string) {
  console.info("🏰 clanOnbo arding körs");
  console.log("clanOnboarding | clanTag: ", clanTag);

  const clanExist = await doesClanExist_clashyStats(clanTag);
  console.log("clanOnboarding | clanExist: ", clanExist);
  if (clanExist) {
    return;
  }
}
