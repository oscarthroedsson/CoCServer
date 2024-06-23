import prisma from "../../prisma";
import {
  ClanHistoryEntry,
  ClanMemberRecord,
  leaveAndJoinClanHistoryObject,
} from "../../types/ClashyStats/clanMemberRecord.types";
import { Clan_clashyStats } from "../../types/ClashyStats/clan.types";
import { LatestClanMembers } from "../../types/ClashyStats/latestClanMembers.types";

export async function getAllClans_clashyStats(): Promise<{ clanTag: string; clanName: string }[]> {
  try {
    const clans = await prisma.clan.findMany({
      select: {
        clanTag: true,
        clanName: true,
      },
    });

    return clans;
  } catch (error) {
    console.error("Error while updating player:", error);
    throw error; // Rethrow the error for error handling
  }
}

/**
 * @description Add a record of the present clan members so we can use this for JoinedAndLeaceClanHistory table
 * @param {clanTag:string, clanMembers:{gameTag:string, gameName:string}} clanMembers - The clan tag
 * @returns {Promise<void>}
 */
export async function addClanMemberRecord(clanMembers: ClanMemberRecord) {
  console.log("addClanMemberRecord: ", clanMembers);
  try {
    await prisma.latestClanMembers.create({
      data: {
        clanTag: clanMembers.clanTag,
        members: clanMembers.clanMembers,
      },
    });
  } catch (error) {
    //todo → Email should be send to oscar.throedsson@gmail.com
    console.error("Error while updating clan members:", error);
  }
}

/**
 * @description Update the record of the present clan members so we can use this for JoinedAndLeaceClanHistory table
 * @param clan
 * @returns {Promise<{id:number, clanTag:String, members:{gameTag:string, gameName:string}[] }>}
 */
export async function updateClanMemberRecord(clan: ClanMemberRecord) {
  try {
    await prisma.latestClanMembers.update({
      where: {
        clanTag: clan.clanTag,
      },
      data: {
        members: clan.clanMembers,
      },
    });
  } catch (error) {
    //todo → Email should be send to oscar.throedsson@gmail.com
    console.error("Error while updating clan members:", error);
  }
}

export async function getLatestClanMemberRecord_clashyStats(clanTag: string): Promise<LatestClanMembers | null> {
  try {
    const clanMembers = await prisma.latestClanMembers.findUnique({
      where: {
        clanTag: clanTag,
      },
    });

    //@ts-ignore - TS wont reconize the members type- it conflicts with prisma-schema
    return clanMembers;
  } catch (error) {
    //todo → Email should be send to oscar.throedsson@gmail.com
    console.error("Error while getting clan members:", error);
    return null;
  }
}

export async function storeJoinedAndLeaveClanHistory(clanTag: string, data: { [key: string]: ClanHistoryEntry }) {
  try {
    await prisma.joinedAndLeaveClanHistory.create({
      data: {
        clanTag: clanTag,
        data: data as any,
      },
    });
  } catch (error) {
    //todo → Email should be send to oscar.throedsson@gmail.com
    console.error("Error while creating leave and join data:", error);
  }
}

export async function getJoinedAndLeaveClanHistory(
  clanTag: string
): Promise<leaveAndJoinClanHistoryObject | null | undefined> {
  try {
    const record = await prisma.joinedAndLeaveClanHistory.findFirst({
      where: {
        clanTag: clanTag,
      },
    });

    return record as leaveAndJoinClanHistoryObject | null;
  } catch (error) {
    //todo → Email should be send to oscar.throedsson@gmail.com
    console.error("Error while fetching leave and join data:", error);
  }
}

export async function updateJoinedAndLeaveClanHistory(recordObject: leaveAndJoinClanHistoryObject) {
  try {
    await prisma.joinedAndLeaveClanHistory.update({
      where: {
        clanTag: recordObject.clanTag,
      },
      data: {
        data: recordObject.data as any,
      },
    });
  } catch (error) {
    //todo → Email should be send to oscar.throedsson@gmail.com
    console.error("Error while updating leave and join data:", error);
  }
}
