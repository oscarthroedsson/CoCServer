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
import { collectClanWarHistory } from "../ClanWar/collectClanWarHistory";
import { getClanWarHistory_ClashKing } from "../../API/ClashKing/ClanWarHistory/clanWarHistory_clashKing";
import { ClanWarMatchObject } from "../../models/types/clanWarObject.types";
import { ClanWarObject_Supercell } from "../../types/Supercell/clanWar.types";
import { ClanWarLeagueMatchObject_Supercell } from "../../types/Supercell/clanWarLeague.types";
import { collectClanWarLeagueHistory } from "../ClanWarLeague/collectClanWarLeagueHistory";

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
  console.log("1-- onBoarding Clan: ", clan);
  // Will add multiple clans
  if (Array.isArray(clan)) {
    const clans = [];
    for (const clanTag of clan) {
      const clanExist = await doesClanExist_clashyStats(clanTag);

      if (!clanExist) {
        const clanData = await getClan_superCell(clanTag);
        if (!clanData) {
          console.error("❗❗ Clan data not found", clanTag);
          continue;
        }

        const clan = await registerClan_clashyStats({
          tag: clanData.tag,
          name: clanData.name,
        });
        clans.push(clan);
      }
    }
    return clans;
  }

  // Will add one clan
  const clanData = await getClan_superCell(clan);
  if (!clanData) {
    console.error("❗❗ Clan data not found", clan);
    return;
  }

  const clanExist = await doesClanExist_clashyStats(clan);
  if (clanExist) return;

  const addedClan = await registerClan_clashyStats({
    tag: clanData.tag,
    name: clanData.name,
  });
  console.log("💎 clan added", addedClan.clanName, " | ", addedClan.clanTag);
  return addedClan;
}

/**
 * @description Register all clan members to the DB, it will fetch current membersList from supercell with the clanTag
 * @param clanTag <string> - The clan tag
 */
export async function onBoard_ClanMembers(clanTag: string) {
  if (!clanTag) return;
  const clan = await getClan_superCell(clanTag);

  if (!clan) {
    console.error("🚨 onBoard_ClanMembers | ❗❗ Clan data not found", clanTag);
    return;
  }

  const members = clan.memberList;

  for (const member of members) {
    const playerExist = await doesPlayerExist_clashyStats(member.tag);

    if (!playerExist) {
      console.log("🚨 Do not Exist", playerExist, " | ", member.tag, " | ", member.name);
      const playerData = await getPlayer_superCell(member.tag);

      if (!playerData) {
        console.error("❗❗ Player data not found", member.tag);
        continue;
      }

      await registerPlayer_clashyStats({
        gameTag: playerData.tag,
        email: null,
        clanTag: playerData.clan.tag,
        gameName: playerData.name,
        acceptTerms: false,
      });
      console.log("🌼 Member added", playerData.name, " | ", playerData.tag);
    }
  }
  console.log("⭐ NO MORE MEMBERS TO ADD");
}

/**
 * @description Register all clan members to the DB, it will fetch current membersList from supercell with the clanTag
 * @param clanTag <string> - The clan tag
 */
export async function onBoard_ClanMemberRegister(clanTag: string) {
  const members: ClanMemberRecordObject[] = [];
  const clan = await getClan_superCell(clanTag);
  if (!clan) return;

  clan.memberList.forEach((member: any) => {
    members.push({
      gameTag: member.tag,
      gameName: member.name,
    });
  });
  // validate this
  addClanMemberRecord({ clanTag: clanTag, clanMembers: members });
}

export async function onBoard_ClanWarHistory(warObject: ClanWarObject_Supercell) {
  if (!warObject) return;
  await collectClanWarHistory(warObject);
}

export async function onBoard_ClanWarLeaguesHistory(clanTag: string) {
  if (!clanTag) return;
  await collectClanWarLeagueHistory(clanTag);
}

//--------------------------- 👥 ONBOARDING GROUPS 👥 ---------------------------
/* This functions onboard multiple stuffs */
export async function onBoard_clanWarLogHistory(clanTag: string) {
  const warHistory = await getClanWarHistory_ClashKing(clanTag);
  if (!warHistory) return;

  const clanWars = warHistory.filter((war: ClanWarObject_Supercell) => war.hasOwnProperty("attacksPerMember"));

  for (const war of clanWars) {
    await onBoard_ClanWarHistory(war);
  }
  console.log("🧙🏼 War History added");
}

/**
 * @description Onboard: Clan, clanmembers, clanMemberRecord, clanCapital, clanWarLogHistory
 * @implements onBoard_Clan, onBoard_ClanMembers, onBoard_ClanMemberRegister, onBoarding_ClanCapital, onBoard_clanWarLogHistory
 * @param clan
 */
export async function onBoard_ClanAndMembers(clan: string) {
  await onBoard_Clan(clan);
  await onBoard_ClanMembers(clan);
  // await onBoard_ClanMemberRegister(clan); // ✅ Tested n it works
  // await onBoarding_ClanCapital(clan); // ✅ Tested n it works
  // await onBoard_clanWarLogHistory(clan); // ✅ clanWar works n
  await onBoard_ClanWarLeaguesHistory(clan);
  console.log("🚚 ✅ Onboarding Done ");
}
