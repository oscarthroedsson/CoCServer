import { getPlayer_superCell } from "../../API/Player/player_Api";
import { addClanMemberRecord } from "../../service/Clan/clan_service";
import { registerClan_clashyStats } from "../../service/Register/registerClan_service";

import { registerPlayer_clashyStats } from "../../service/Register/registerPlayer_service";
import { ClanMemberRecordObject } from "../../service/types/clanService.types";
import { doesClanExist_clashyStats } from "../../validation/Clan/doesClanExist";
import { doesPlayerExist_clashyStats } from "../../validation/Player/doesPlayerExist";

export async function onBoardClanMembers(clanTag: string, clanMembers: any[]) {
  for (const member of clanMembers) {
    const memberExist = await doesPlayerExist_clashyStats(member.tag);

    if (!memberExist) {
      const playerObject = await getPlayer_superCell(member.tag);

      if (playerObject) {
        await registerPlayer_clashyStats({
          gameTag: playerObject.tag,
          clanTag: playerObject.clan.tag,
          gameName: playerObject.name,
          email: null,
          acceptTerms: false,
        });

        console.log(`Added: ${playerObject.tag} ${playerObject.name}`);
      }
    }
  }
}

export async function onBoardClanMemberRegister(clanTag: string, clanMembers: any[]) {
  const members: ClanMemberRecordObject[] = [];

  clanMembers.forEach((member: any) => {
    members.push({
      gameTag: member.tag,
      gameName: member.name,
    });
  });

  addClanMemberRecord({ clanTag: clanTag, clanMembers: members });
}

/**
 * @description Can onboard multiple clans and their members or just one clan and its memberss
 * @param clans <Array> | <Object> - Array of clans or just one clan
 */
export async function onBoardClanAndMembers(clans: any) {
  if (Array.isArray(clans)) {
    for (const clan of clans) {
      console.log("Clan: ", clan.tag, " ", clan.name);

      const clanExist = await doesClanExist_clashyStats(clan.tag);
      if (!clanExist) {
        await registerClan_clashyStats({
          tag: clan.tag,
          name: clan.name,
        });
        onBoardClanMembers(clan.tag, clan.members);
        onBoardClanMemberRegister(clan.tag, clan.members);
        console.log("🍷 Clan added to DB", clan.tag, " ", clan.name);
      } else {
        console.log("📦  Clan already exists in DB", clan.tag, " ", clan.name);
      }
    }
  } else {
    const clanExist = await doesClanExist_clashyStats(clans.tag);
    if (!clanExist) {
      await registerClan_clashyStats({
        tag: clans.tag,
        name: clans.name,
      });
      onBoardClanMembers(clans.tag, clans.members);
      onBoardClanMemberRegister(clans.tag, clans.members);
    } else {
      console.log("Clan already exists in DB", clans.tag, " ", clans.name);
    }
  }

  console.log("🏆 Done onboarding");
}
