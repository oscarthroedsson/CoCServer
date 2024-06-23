import { get } from "http";
import { getClan_superCell } from "../../API/Clan/clan_Api";
import { getPlayer_superCell } from "../../API/Player/player_Api";
import { addClanMemberRecord } from "../../service/Clan/clan_service";
import { registerClan_clashyStats } from "../../service/Register/registerClan_service";

import { registerPlayer_clashyStats } from "../../service/Register/registerPlayer_service";
import { ClanMemberRecordObject } from "../../types/ClashyStats/clanMemberRecord.types";

import { doesClanExist_clashyStats } from "../../validation/Clan/doesClanExist";
import { doesPlayerExist_clashyStats } from "../../validation/Player/doesPlayerExist";

import { onBoarding_ClanCapital } from "./clanCapital_Onboarding";
import { getClanWarLog_superCell } from "../../API/War/war_Api";
import { WarLog_ClanWarHistory, WarLog_ClanWarLeagueHistory } from "../../types/Supercell/warLog.types";

/*
# Onboarding 
Onboarding
✅ clan
✅ clanMembers
clanMemebersRecord
clanAndMembers
warLog // differ from clanWar and ClanWarLeague
RaidCapital
*/

/**
 * @description Onboard a clan or clans to the DB
 * @param clan <string> | <string[]> - The clan tag or an array of clan tags
 */
export async function onBoard_Clan(clan: string | string[]) {
  // Will add multiple clans
  if (Array.isArray(clan)) {
    for (const clanTag of clan) {
      const clanExist = await doesClanExist_clashyStats(clanTag);

      if (!clanExist) {
        const clanData = await getClan_superCell(clanTag);
        await registerClan_clashyStats({
          tag: clanData.tag,
          name: clanData.name,
        });
      }
    }
    return;
  }

  // Will add one clan
  const clanData = await getClan_superCell(clan);
  await registerClan_clashyStats({
    tag: clanData.tag,
    name: clanData.name,
  });
}

/**
 * @description Register all clan members to the DB, it will fetch current membersList from supercell with the clanTag
 * @param clanTag <string> - The clan tag
 */
export async function onBoard_ClanMembers(clanTag: string) {
  if (!clanTag) return;
  const clan = await getClan_superCell(clanTag);
  const members = clan.memberList;

  for (const member of members) {
    const playerExist = await doesPlayerExist_clashyStats(member.tag);
    if (!playerExist) {
      const playerData = await getPlayer_superCell(member.tag);
      await registerPlayer_clashyStats({
        gameTag: playerData.tag,
        email: null,
        clanTag: playerData.clan.tag,
        gameName: playerData.name,
        acceptTerms: false,
      });
    }
  }
}

/**
 * @description Register all clan members to the DB, it will fetch current membersList from supercell with the clanTag
 * @param clanTag <string> - The clan tag
 */
export async function onBoard_ClanMemberRegister(clanTag: string) {
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

export async function onBoard_ClanWarHistory(war: WarLog_ClanWarHistory) {}
export async function onBoard_ClanWarLeaguesHistory(war: WarLog_ClanWarLeagueHistory) {}

export async function onBoard_clanWarLogHistory(clanTag: string) {
  const warHistory = await getClanWarLog_superCell(clanTag);
  if (!warHistory) return;

  for (const war of warHistory.items) {
    if (war.attacksPerMember === 1 && !war.opponent.name) {
      onBoard_ClanWarHistory(war as WarLog_ClanWarHistory);
    } else if (war.attacksPerMember === 2 && war.opponent.name) {
      onBoard_ClanWarLeaguesHistory(war as WarLog_ClanWarLeagueHistory);
    }
  }
}

/**
 * @description Do all the onboarding functions for a clan
 * @implements onBoard_Clan, onBoard_ClanMembers, onBoard_ClanMemberRegister
 * @param clan
 */
export async function onBoard_ClanAndMembers(clan: string) {
  await onBoard_Clan(clan);
  await onBoard_ClanMembers(clan);
  // await onBoard_ClanMemberRegister(clan); // ✅ Tested n it works
  // await onBoarding_ClanCapital(clan); // ✅ Tested n it works
  await onBoard_clanWarLogHistory(clan);
}
