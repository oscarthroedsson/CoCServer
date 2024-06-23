import { getClanCapital_superCell } from "../../API/ClanCapital/clanCapital_Api";
import { getAllClans_clashyStats } from "../../service/Clan/clan_service";
import { convertToCorrectDateObject } from "../../utils/helpers/converToCorrectDateObj";

import { isSameMonth } from "date-fns";
import { doesCapitalRaidsExist_clashyClash } from "../../validation/clanCapital/clanCapital_validation";
import {
  getClanCapitalRaids_clashyClash,
  storeCapitalDistrictAttacks_clashyClash,
  storeCapitalRaidDistricts_clashyClash,
  storeClanCapitalRaid_clashyClash,
  storeClanCapitalRaids_clashyClash,
} from "../../service/clanCapital/clanCapital_service";

/**
 * @description Collects the clan capital data from the supercell API and stores it in the database
 * @description This job will run every Monday at 06:00
 * @returns {Promise<void>} A promise that resolves once the data collection and storage is complete.
 * 
 * 📘 //# This function is runs every Monday. 
    .. First time we run it, we need to create a CapitalRaid for the month, if it doesn´t exist. That will hold all the specific raids for the month.
 */

export async function job_collectClanCapitalData() {
  // get all clans from the database
  const clanTag = "#2QJ2QG29R"; //! remove when done
  const allClans = await getAllClans_clashyStats(); //# ← use this instead of clanTag
  const presentDate = new Date(); // get the present date so we can find the raids that we are looking for.

  /*
  📚 We use year(YYYY) and month(MM) to divide all the data in seasons
  */
  const thisYear = presentDate.getFullYear(); // get the year
  const thisMonth = presentDate.getMonth() + 1; // get the month

  // Loop through all the clans from our DB so we can collect clan capital data
  for (const clan of allClans) {
    // get the clan capital data from the supercell APIs for the specific clan we are looping
    const clanCapitalData = await getClanCapital_superCell(clan.clanTag);
    let raidID: number | undefined = 0; // we need to store the raidID so we can store the specific raids

    // We find the raid that is ongoing for this week and month
    const thisMonthRaids = clanCapitalData.items.filter((raid) => {
      const raidDate = convertToCorrectDateObject(raid.startTime).fulldate;
      return isSameMonth(raidDate, presentDate) && raid.state === "ongoing";
    });
    const capitalRaidsExist = await doesCapitalRaidsExist_clashyClash(clan.clanTag, thisMonth, thisYear); // check if the monthly column exist in out DB

    /*  
    📚 We loop threw the raids that are relevant for this month
    */
    for (const raids of thisMonthRaids) {
      let raidID: number | undefined = 0;
      if (raidID === undefined) break;

      /*
      📚  If it doesn´t exist, it means that it is the first week and raid of the month
      */
      if (capitalRaidsExist) {
        const capitalRaidResponse = await getClanCapitalRaids_clashyClash(clanTag);
        raidID = capitalRaidResponse?.id; // save the id of the column to a global variable
      } else {
        // 📚 create the column for the month in DB, if this is the first time this function is run for the month
        const capitalRaidsID = await storeClanCapitalRaids_clashyClash(
          { clanTag: clan.clanTag, clanName: clan.clanName },
          { year: thisYear, month: thisMonth },
          {
            capitalTotalLoot: raids.capitalTotalLoot,
            raidsCompleted: raids.raidsCompleted,
            totalAttacks: raids.totalAttacks,
            enemyDistrictsDestroyed: raids.enemyDistrictsDestroyed,
            offensiveReward: raids.offensiveReward,
            defensiveReward: raids.defensiveReward,
            totalRaids: raids.totalAttacks,
          }
        );

        if (!capitalRaidsID?.id) break; //🚨 abort if somehting goes wrong with storing in DB
        raidID = capitalRaidsID.id; // save the id of the column to a global variable
      }

      /*
      📚 Loop over thee specifc raids 
      */
      for (const [index, raid] of raids.attackLog.entries()) {
        if (raidID === undefined) break;

        const clanCapitalRaidResponse = await storeClanCapitalRaid_clashyClash(
          raidID,
          index,
          { clanTag: clan.clanTag, clanName: clan.clanName, defender: raid.defender.tag },
          {
            attacksMade: raid.attackCount,
            numOfDistricts: raid.districtCount,
            enemyDistrictsDestroyed: raid.districtsDestroyed,
          }
        );
        if (!clanCapitalRaidResponse?.id) break; //🚨 abort if somehting goes wrong with storing in DB- we can´t continue without the ID

        /*
          📚 
        */
        for (const districts of raid.districts) {
          if (!districts.hasOwnProperty("attacks")) break; // only ongoing raid has the 🔑 attacks, we only collect ongoing in this function

          /**
           *📚  Response object for storing capital raid districts.
           */
          const capitalRaidDistrictsResponse = await storeCapitalRaidDistricts_clashyClash({
            capitalRaidId: clanCapitalRaidResponse?.id ? clanCapitalRaidResponse.id : 0,
            district: districts.name,
            destructionPercent: districts.destructionPercent,
            attackCount: districts.attackCount,
          });

          if (!capitalRaidDistrictsResponse?.id) break; //🚨 abort if somehting goes wrong with storing in DB- we can´t continue without the ID

          // 📚 Storing each attack on the relevant district
          for (const [index, attacks] of districts.attacks.entries()) {
            let firstIndex = index + 1;

            // 📐 Calculate how much the attacker destroyed of the defender capital
            const attackerDestruction = attacks.destructionPercent;
            const previousAttackerDestruction = districts.attacks[firstIndex + 1]?.destructionPercent ?? 0;
            const destruction = attackerDestruction - previousAttackerDestruction;

            // 📚 Storing each attack and connecting it to CapitalRaidDistrict table
            await storeCapitalDistrictAttacks_clashyClash(
              {
                capitalDistrictsId: capitalRaidDistrictsResponse?.id ? capitalRaidDistrictsResponse.id : 0,
                attack: index + 1,
              },
              {
                playerName: attacks.attacker.name,
                playerTag: attacks.attacker.tag,
                districtName: districts.name,
                destruction: destruction,
                starsReached: attacks.stars,
              },
              {
                year: thisYear,
                month: thisMonth,
              }
            );
          }
        }
      }
    }
  }
}
