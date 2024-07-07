import { getClan_superCell } from "../../API/Clan/clan_Api";
import { getClanCapital_superCell } from "../../API/ClanCapital/clanCapital_Api";
import {
  getClanCapitalRaids_clashyClash,
  storeCapitalRaidDistricts_clashyClash,
  storeClanCapitalRaid_clashyClash,
  storeClanCapitalRaids_clashyClash,
} from "../../service/clanCapital/clanCapital_service";
import { convertToCorrectDateObject } from "../../utils/helpers/converToCorrectDateObj";
import {
  doesCapitalRaidsExist_clashyClash,
  doesClanCapitalRaidExits_clashyClash,
} from "../../validation/clanCapital/clanCapital_validation";

export async function onBoarding_ClanCapital(clanTag: string) {
  let raidID: number | undefined = 0;
  const clan = await getClan_superCell(clanTag);
  if (!clan) return;

  // 📚 Get all Clan capital data and sort out raids that aren´t onGoing
  const clanCapitalData = await getClanCapital_superCell(clanTag);
  const raidHistory = clanCapitalData.items.filter((raid) => {
    return raid.state !== "ongoing" && raid.state !== "preparing";
  });

  let count = 0;
  for (const raid of raidHistory) {
    count++;
    const year = convertToCorrectDateObject(raid.startTime).getFullYear();
    const month = convertToCorrectDateObject(raid.startTime).getMonth();
    const capitalRaidsExist = await doesCapitalRaidsExist_clashyClash(clanTag, month, year);

    if (capitalRaidsExist) {
      const capitalRaidResponse = await getClanCapitalRaids_clashyClash(clanTag, year, month);
      raidID = capitalRaidResponse?.id; // save the id of the column to a global variable
    } else {
      // 📚 create the column for the month in DB, if this is the first time this function is run for the month
      const capitalRaidsID = await storeClanCapitalRaids_clashyClash(
        { clanTag: clan.tag, clanName: clan.name },
        { year: year, month: month },
        {
          capitalTotalLoot: raid.capitalTotalLoot,
          raidsCompleted: raid.raidsCompleted,
          totalAttacks: raid.totalAttacks,
          enemyDistrictsDestroyed: raid.enemyDistrictsDestroyed,
          offensiveReward: raid.offensiveReward,
          defensiveReward: raid.defensiveReward,
          totalRaids: raid.totalAttacks,
        }
      );
      if (!capitalRaidsID?.id) break; // need the ID to store the raids
      raidID = capitalRaidsID.id; // save the id of the column to a global variable

      /*
      📚 Loop over thee specifc raids 
      */
      for (const [index, attackRaid] of raid.attackLog.entries()) {
        if (raidID === undefined) break;

        // 🚓 Validate if the Raid already exist
        const clanCapitalRaidExist = await doesClanCapitalRaidExits_clashyClash(
          raidID,
          clan.name,
          attackRaid.defender.tag
        );

        if (clanCapitalRaidExist) break; // 🚨 if the raid exist break, becuase if it exist the attacks exist

        const clanCapitalRaidResponse = await storeClanCapitalRaid_clashyClash(
          raidID,
          index + 1,
          { clanTag: clan.tag, clanName: clan.name, defender: attackRaid.defender.tag },
          {
            attacksMade: attackRaid.attackCount,
            numOfDistricts: attackRaid.districtCount,
            enemyDistrictsDestroyed: attackRaid.districtsDestroyed,
          }
        );

        if (!clanCapitalRaidResponse?.id) break; //🚨 abort if somehting goes wrong with storing in DB- we can´t continue without the ID

        for (const districts of attackRaid.districts) {
          await storeCapitalRaidDistricts_clashyClash({
            capitalRaidId: clanCapitalRaidResponse?.id ? clanCapitalRaidResponse.id : 0,
            district: districts.name,
            destructionPercent: districts.destructionPercent,
            attackCount: districts.attackCount,
            totalLooted: districts.totalLooted,
          });
        }
      }
    }
  }
}
