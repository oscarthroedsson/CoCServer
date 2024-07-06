import { onBoard_ClanAndMembers } from "../../middlewares/Onboarding/clan_Onboarding";
import { doesClanExist_clashyStats } from "../../validation/Clan/doesClanExist";

export async function shouldClanBeOnboarded(clanGroup: { tag: string; name: string }[]) {
  if (!clanGroup) return;

  for (const clan of clanGroup) {
    const clanExist = await doesClanExist_clashyStats(clan.tag);
    if (clanExist) continue;
    await onBoard_ClanAndMembers(clan.tag);
  }
}
