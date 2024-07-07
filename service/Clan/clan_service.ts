import prisma from "../../prisma";
import {
  ClanHistoryEntry,
  ClanMemberRecord,
  leaveAndJoinClanHistoryObject,
} from "../../types/ClashyStats/clanMemberRecord.types";
import { LatestClanMembers } from "../../types/ClashyStats/latestClanMembers.types";
import { addNewClanProps } from "../../types/Register/Register.types";

export function storeClan_ClashyStats(newClan: addNewClanProps) {
  try {
    return prisma.clan.create({
      data: {
        clanTag: newClan.tag,
        clanName: newClan.name,
      },
    });
  } catch (error) {
    throw new Error(
      `Error while creating clan: ${newClan.tag} - ${newClan.name} | error: ${error} | fn: getAllClans_clashyStats`
    );
  }
}

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
    throw new Error(`Error while fetching all clans | Error: ${error} | fn: getAllClans_clashyStats`);
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
    throw new Error(
      `Error while creating clan members: ${clanMembers.clanTag} | error: ${error} | fn: addClanMemberRecord`
    );
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
    throw new Error(
      `Error while updating clan members: ${clan.clanTag} | error: ${error} | fn: updateClanMemberRecord`
    );
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
    // cant throw error and return null
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
    throw new Error(
      `Error while creating clan members: ${clanTag} | error: ${error} | fn: storeJoinedAndLeaveClanHistory`
    );
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
    throw new Error(
      `Error while fetching clan members: ${clanTag} | error: ${error} | fn: getJoinedAndLeaveClanHistory`
    );
  }
}

export async function updateJoinedAndLeaveClanHistory(recordObject: leaveAndJoinClanHistoryObject) {
  try {
    await prisma.joinedAndLeaveClanHistory.create({
      data: {
        clanTag: recordObject.clanTag,
        data: recordObject.data as any,
      },
    });
  } catch (error) {
    throw new Error(
      `Error while updating clan members: ${recordObject.clanTag} | error: ${error} | fn: updateJoinedAndLeaveClanHistory`
    );
  }
}
