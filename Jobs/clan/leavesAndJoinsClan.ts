import { getClan_superCell } from "../../API/Clan/clan_Api";
import { onBoard_ClanMemberRegister } from "../../middlewares/Onboarding/clan_Onboarding";
import { convertToLeaveAndJoinClanObject } from "../../models/convertToLeaveAndJoinClanObject";
import {
  getAllClans_clashyStats,
  getJoinedAndLeaveClanHistory,
  getLatestClanMemberRecord_clashyStats,
  storeJoinedAndLeaveClanHistory,
  updateJoinedAndLeaveClanHistory,
} from "../../service/Clan/clan_service";
import { ClanMemberRecordObject, MemberShipChangesObject } from "../../types/ClashyStats/clanMemberRecord.types";
import { LatestClanMembersObject } from "../../types/ClashyStats/latestClanMembers.types";

/**
 * @description Will look who leavees and join the clan
 * @returns void
 */
export async function job_leavesAndJoinsClan() {
  const clanTags = await getAllClans_clashyStats(); // get all clans from the database
  const dateToday = new Date(); // get todays date
  const formattedDate = dateToday.toISOString().split("T")[0].toString(); // format the date to a string
  const newRecord: MemberShipChangesObject[] = [];

  /*
  Go threw every clan we have in our DB
  */
  for (const clanTag of clanTags) {
    // get latest list of members
    const previousMemberList = await getLatestClanMemberRecord_clashyStats(clanTag.clanTag);
    if (!previousMemberList) {
      await onBoard_ClanMemberRegister(clanTag.clanTag); // if no record is found, onboard the clan
      continue;
    }

    const currentMembersList = await getClan_superCell(clanTag.clanTag);
    if (!currentMembersList) continue;

    /*
   📚 We loop over our latest member record to to see if we can find all members the members in the current memberlist from supercell
   if not, they have left the clan
    */
    for (const member of previousMemberList?.members as LatestClanMembersObject[]) {
      // 📚 Search if we can find the member in previous record among the current member list from supercell
      const stillInClan = currentMembersList.memberList.find((m: any) => member.gameName === m.name);

      // 📚 if we found the member, this will be true or this will be false
      const found = stillInClan != undefined;

      // 📚 if didn´t found in current member list, create a record for leaving the clan
      if (!found) newRecord.push(convertToLeaveAndJoinClanObject(member.gameName, member.gameTag, "left"));
    }

    /*
    📚 We loop over th current member list from supercell and see if we can find them in the latest member record. If not, they have joined since 
    last time we checked
    */
    for (const member of currentMembersList.memberList) {
      // Check if the member has joined the clan (previousMemberList)
      const joinedClan = (previousMemberList.members as ClanMemberRecordObject[]).find((m) => m.gameTag === member.tag);
      const found = joinedClan !== undefined;

      // If not found in previousMemberList, create a record for joining the clan
      if (!found) newRecord.push(convertToLeaveAndJoinClanObject(member.name, member.tag, "joined"));
    }

    /*
    📚 We create the response object of the results from our find
    
    "YYYY-MM-DD": {
    left:[{gameTag: string, gameName: string, type: string, time: Date}...],
    joined:[{gameTag: string, gameName: string, type: string, time: Date}...],
    membershipChanges:[{gameTag: string, gameName: string, type: string, time: Date}...]
    }
    */

    const clanHistory = {
      [formattedDate]: {
        left: newRecord.filter((r) => r.type === "left").length,
        joined: newRecord.filter((r) => r.type === "joined").length,
        membershipChanges: newRecord,
      },
    };

    const presentRecord = await getJoinedAndLeaveClanHistory(clanTag.clanTag);

    if (clanHistory[formattedDate].membershipChanges.length < 0) return;

    if (!presentRecord) {
      storeJoinedAndLeaveClanHistory(clanTag.clanTag, clanHistory);
    } else {
      Object.assign(presentRecord.data, clanHistory);
      delete presentRecord.id;

      // 📚
      updateJoinedAndLeaveClanHistory(presentRecord);
    }
  }
}
