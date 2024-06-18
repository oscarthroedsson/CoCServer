import { getClan_superCell } from "../../API/Clan/clan_Api";
import { getPlayer_superCell } from "../../API/Player/player_Api";
import { addClanMemberRecord } from "../../service/Clan/clan_service";
import { registerClan_clashyStats } from "../../service/Register/registerClan_service";

import { registerPlayer_clashyStats } from "../../service/Register/registerPlayer_service";
import { ClanMemberRecordObject } from "../../service/types/clanService.types";
import { doesClanExist_clashyStats } from "../../validation/Clan/doesClanExist";
import { doesPlayerExist_clashyStats } from "../../validation/Player/doesPlayerExist";

/**
 * @description Register all clan members to the DB, it will fetch current membersList from supercell with the clanTag
 * @param clanTag <string> - The clan tag
 */
export async function onBoardClanMembers(clanTag: string) {
  const clan = await getClan_superCell(clanTag);
  for (const member of clan.memberList) {
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

/**
 * @description Register all clan members to the DB, it will fetch current membersList from supercell with the clanTag
 * @param clanTag <string> - The clan tag
 */
export async function onBoardClanMemberRegister(clanTag: string) {
  const members: ClanMemberRecordObject[] = [];
  const clan = await getClan_superCell(clanTag);

  clan.memberList.forEach((member: any) => {
    members.push({
      gameTag: member.tag,
      gameName: member.name,
    });
  });
  // validate this
  addClanMemberRecord({ clanTag: clanTag, clanMembers: members });
}

/**
 * @description Can onboard multiple clans and their members or just one clan and its memberss
 * @param clans <Array> | <Object> - Array of clans or just one clan
 */
export async function onBoardClanAndMembers(clans: ClanObject | ClanObject[]) {
  if (Array.isArray(clans)) {
    // is array
    for (const clan of clans) {
      const clanExist = await doesClanExist_clashyStats(clan.tag);

      if (!clanExist) {
        await registerClan_clashyStats({
          tag: clan.tag,
          name: clan.name,
        });

        onBoardClanMemberRegister(clan.tag);
        console.log("🍷 Clan added to DB", clan.tag, " ", clan.name);
      }
      onBoardClanMembers(clan.tag);
    }
    // Not an array
  } else {
    const clanExist = await doesClanExist_clashyStats(clans.tag);
    if (!clanExist) {
      await registerClan_clashyStats({
        tag: clans.tag,
        name: clans.name,
      });

      onBoardClanMemberRegister(clans.tag);
    }
    onBoardClanMembers(clans.tag);
  }

  console.log("🏆 Done onboarding");
}

interface ClanObject {
  tag: string;
  name: string;
  members: any[];
}
