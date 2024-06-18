import { Prisma } from "@prisma/client";
import prisma from "../../prisma";
import { ClanMemberRecord } from "../types/clanService.types";
import { ClanHistoryEntry, leaveAndJoinClanHistoryObject } from "../../Jobs/types/clan/jobsClan.types";

export async function getAllClans_clashyStats() {
  try {
    const clans = await prisma.clan.findMany({
      select: {
        clanTag: true,
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

export async function getClanMemberRecord(clanTag: string) {
  try {
    const clanMembers = await prisma.latestClanMembers.findUnique({
      where: {
        clanTag: clanTag,
      },
    });

    return clanMembers;
  } catch (error) {
    //todo → Email should be send to oscar.throedsson@gmail.com
    console.error("Error while getting clan members:", error);
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
