import { getClanCapital_superCell } from "../../API/ClanCapital/clanCapital_Api";
import { getAllClans_clashyStats } from "../../service/Clan/clan_service";

/**
 * @description Collects the clan capital data from the supercell API and stores it in the database
 * @description This job will run every Monday at 06:00
 * @returns void
 */

export async function job_collectClanCapitalData() {
  // get all clans from the database
  const clanTag = "#2QJ2QG29R";

  const allClans = await getAllClans_clashyStats();

  const clanCapitalData = getClanCapital_superCell(clanTag);
  console.log("❤️‍🔥 Clan Capital data:", clanCapitalData);

  // get clan capital DATA
  /*
    The data recived, the array-items in items are the raids, not specific to season, need to 
    check the dates so we can filter the raids in to seasons
*/
  //# 👂🏼 Lastst data will always be in the first array-item
  // 💂🏼 Take startTime &  endTime and convert it to seasonYear, seasonMonth
  //  👀 Check if we have CapitalRaid column in our DB for this season → if not, create it, else go on → use: seasonYear, seasonMonth & clanTag to validate
  //
  // 🏗️ Build the CAPITAL RAID object.
  //.. 🧹  Data will be in the outer keys of the object
  //.. 🔍 Collect -> startTime, endTime, capitalTotalLoot, raidsCompleted, totalAttacks, enemyDistrictsDestroyed, offensiveReward, defensiveReward
  //
  // 🏗️ Collect the MEMBERS array and collect summary
  //.. 🧹  Data will be in the array of 🔑 members ❗To be able to collect all ncesery data you need to look in 🔑 attackLog
  //.. 🔍 Collect ->tag, name, attacks,capitalResourcesLooted → ❗Neeed to look on attacks to be able to set data for:districtsTakeDown, totalDesttructions
  //
  // 🏗️ Create attacks objects ?? how ??
  //.. 🧹  ?? WHAAT
  //.. 🔍  ?? WHAAT
  //
  // 👀 Handle if defender isn´t in our DB
  // todo | write logic for this
}
