import { getClan_superCell } from "../../API/Clan/clan_Api";
import {
  getAllClans_clashyStats,
  getJoinedAndLeaveClanHistory,
  getLatestClanMemberRecord_clashyStats,
  storeJoinedAndLeaveClanHistory,
  updateJoinedAndLeaveClanHistory,
} from "../../service/Clan/clan_service";
import { ClanMemberRecordObject, MemberShipChangesObject } from "../../types/ClashyStats/clanMemberRecord.types";
import {
  ClanMemberHistoryObject,
  LatestClanMembers,
  LatestClanMembersObject,
} from "../../types/ClashyStats/latestClanMembers.types";

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
      throw new Error("No member record found");
    }

    const currentMembersList = await getClan_superCell(clanTag.clanTag);
    if (!currentMembersList) continue;

    /*
    If current member cant´t be found, it means that the member has left the clan
    */
    for (const member of previousMemberList?.members as LatestClanMembersObject[]) {
      const stillInClan = currentMembersList.memberList.find((m: any) => member.gameName === m.name);

      const found = stillInClan != undefined;

      if (!found) {
        console.log("LEFT: ", member.gameName);
        newRecord.push(createLeaveAndJoinClanObject(member.gameName, member.gameTag, "left"));
      }
    }

    /*
    If current member cant´t be found, it means that the member has left the clan
    */
    for (const member of currentMembersList.memberList) {
      // Check if the member has joined the clan (previousMemberList)
      const joinedClan = (previousMemberList.members as ClanMemberRecordObject[]).find((m) => m.gameTag === member.tag);

      const found = joinedClan !== undefined;

      // If not found in previousMemberList, create a record for joining the clan
      if (!found) {
        console.log("JOINED: ", member.name);
        newRecord.push(createLeaveAndJoinClanObject(member.name, member.tag, "joined"));
      }
    }

    const clanHistory = {
      [formattedDate]: {
        left: newRecord.filter((r) => r.type === "left").length,
        joined: newRecord.filter((r) => r.type === "joined").length,
        membershipChanges: newRecord,
      },
    };
    const presentRecord = await getJoinedAndLeaveClanHistory(clanTag.clanTag);
    console.log("🦖 PRESENTRECORD :", presentRecord);

    if (clanHistory[formattedDate].membershipChanges.length < 0) return;

    if (!presentRecord) {
      console.log("Creating new record");
      storeJoinedAndLeaveClanHistory(clanTag.clanTag, clanHistory);
    } else {
      Object.assign(presentRecord.data, clanHistory);
      delete presentRecord.id;
      console.log("presentRecord: ", presentRecord);
      updateJoinedAndLeaveClanHistory(presentRecord);
    }
  }
}

export const createLeaveAndJoinClanObject = (
  gameName: string,
  gameTag: string,
  type: string
): MemberShipChangesObject => {
  return {
    gameTag: gameTag,
    gameName: gameName,
    type: type,
    time: new Date(),
  };
};

// {
// clanTag: "#n123njd",
// data:{
//   clanTag: "#n123njd",
//   "2022-01-01": {
//     left: 10,
//     joined: 5,
//     membershipChanges: [],
//   },
//   "2022-01-02": {
//     left: 10,
//     joined: 5,a
//     membershipChanges: [
//       {
//         gameTag: "#1234",
//         gameName: "pelleSvansos",
//         type: "left",
//         time: new Date(),
//       },
//     ],
//   },
//   "2022-01-03": {
//     left: 10,
//     joined: 5,
//     trackRecord: [],
//   },
// }
// }
