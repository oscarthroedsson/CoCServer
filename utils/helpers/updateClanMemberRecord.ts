import { getClan_superCell } from "../../API/Clan/clan_Api";
import { getAllClans_clashyStats, updateClanMemberRecord } from "../../service/Clan/clan_service";
import { ClanMemberRecord, ClanMemberRecordObject } from "../../types/ClashyStats/clanMemberRecord.types";

import { PlayerObjectResponse } from "../../types/Player/PlayerObject.types";
import { MemberListObject_Supercell } from "../../types/Supercell/clan.types";

export async function generateClanMemberRecord(): Promise<void> {
  // takes the clanMembers and update it every 6 hours.
  const clanTags = await getAllClans_clashyStats();
  // loop threw all clan  tags in DB
  for (const clanTag of clanTags) {
    const members: ClanMemberRecordObject[] = [];
    const clanMembers = await getClan_superCell(clanTag.clanTag); // get clan data
    if (!clanMembers) continue;

    // loop threw all clan members and add them to the members array
    clanMembers.memberList.forEach((member: MemberListObject_Supercell) => {
      members.push({
        gameTag: member.tag,
        gameName: member.name,
      });
    });

    updateClanMemberRecord({
      clanTag: clanTag.clanTag,
      clanMembers: members,
    });
  }
}

export function createClanMemberRecordObject(
  clanTag: string,
  clanMembers: MemberListObject_Supercell[]
): ClanMemberRecord {
  const members: ClanMemberRecordObject[] = [];
  clanMembers.forEach((member) => {
    members.push({
      gameTag: member.tag,
      gameName: member.name,
    });
  });

  return {
    clanTag: clanTag,
    clanMembers: members,
  };
}
