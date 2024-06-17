import { match } from "assert";
import {
  getClanWarLeagueGroup_superCell,
  getClanWarLeagueRoundMatch_superCell,
} from "../../../API/ClanWarLeague/clanWarLeague_Api";
import { onBoardClanAndMembers } from "../../../middlewares/Onboarding/clan_Onboarding";
import { getAllClans_clashyStats } from "../../../service/Clan/clan_service";
import {
  storeClanWarLeagueAttacks_clashyStats,
  storeClanWarLeagueGroup_clashyStats,
  storeClanWarLeagueMatch_clashyStats,
} from "../../../service/ClanWarLeague/clanWarLeague_service";
import { doesCWLMatchExist_clashyStats } from "../../../validation/war/doesCWLMatchExist";
import { isClanWarLeagueActive_superCell } from "../../../validation/war/isClanWarLeagueActive";
import { findMatchWinner } from "../../../utils/helpers/foundMatchWinner";
import { createCLWMatchObject_model } from "../../../models/createCLWMatchObject_model";
import { CwlMatchObject } from "../../../models/types/cwlMatchObject.types";
import { convertToMatchObject } from "../../../models/convertToMatchObjects";
import { convertToAttackObject } from "../../../models/convertToAttackObject";

export async function collectClanWarLeauge() {
  const allClans = await getAllClans_clashyStats();
  const date = new Date();
  console.log("Date: ", date);

  //
  for (const clan of allClans) {
    // // 1. Check if a CWL is active
    // const isActive = await isClanWarLeagueActive(clan.clanTag);

    // if (!isActive.status) continue; // if not, check the if the other clans have active CWL

    // If it is active, get the group and onBoard the clan and its members
    const cwlGroup = await getClanWarLeagueGroup_superCell(clan.clanTag);

    // make sure to add all clans and their players to our DB if they are not already there
    // if (isActive) await onBoardClanAndMembers(cwlGroup.clans);

    //! hantera om clanen inte är aktiv i ett CWL

    if (cwlGroup.status === false) continue;
    const clansOfGroup = cwlGroup.clans.map((clan: any) => clan.tag);
    const year = Number(cwlGroup.season.split("-")[0]);
    const month = Number(cwlGroup.season.split("-")[1]);

    const warGroup = await storeClanWarLeagueGroup_clashyStats(year, month, clansOfGroup);
    console.log("warGroup: ", warGroup);
    if (!warGroup) continue;
    // Determan if we collect data or scheduale a job to do so after endTime
    // Loops over the array that holds all the war matches {rounds}
    for (const [index, round] of cwlGroup.rounds.entries()) {
      for (const [matchIndex, warTag] of round.warTags.entries()) {
        // console.info(`🪪 id: ${warTag}`);
        // console.info("🏷️ tag: ", clan.clanTag);

        const matchObject = await getClanWarLeagueRoundMatch_superCell(warTag);

        const convertedObject = convertToMatchObject(warGroup.id, index + 1, matchObject.clan, matchObject.opponent);
        const { id } = await storeClanWarLeagueMatch_clashyStats(convertedObject);

        console.log("clan members: ", matchObject.clan.members);
        console.log("opponent members: ", matchObject.opponent.members);

        const allAttacksArray = convertToAttackObject(matchObject.clan.members, matchObject.opponent.members, id);
        console.log("allAttacksArray: ", allAttacksArray);
        // const attacks = await storeClanWarLeagueAttacks_clashyStats(allAttacksArray);
        // console.log("attacks: ", attacks);

        console.log("🏆🎊 DONE:");
      }
    }

    break;
  }
}
