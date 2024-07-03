import cron from "node-cron";
import { cronExecutionTime } from "../utils/constants/cronSchedules";
import { job_CollectrophyHistory } from "./player/trophyHistory";
import { job_CollectDonationHistory } from "./player/donationHistory";
import { job_clanCapitalContributionsHistory } from "./player/clanCapitalContributionsHistory";
import { job_leavesAndJoinsClan } from "./clan/leavesAndJoinsClan";
import { checkIfClanIsAtWar } from "./war/ClanWar/checkIfClanIsAtWar";
import { job_collectClanCapitalData } from "./clanCapital/collectClanCapitalData";
import { checkIfClanWarLeagueIsActive } from "./war/ClanWarLeague/checkIfClanWarLeagueIsActive";

export function scheduleJobs() {
  // 🏗️ Collect -> 🏆 Trophys -> 👬🏼 Join and Leaves Clan
  cron.schedule(
    cronExecutionTime.Every_SixHours,
    () => {
      console.log(`schedule| Running trophyHistory() in 6 hours`);
      //🃏 Player
      job_CollectrophyHistory();

      //🕵️ clan
      job_leavesAndJoinsClan();
    },
    {
      timezone: "Europe/Stockholm",
    }
  );

  /**
   * @description Collects the donation history and clan capital contributions for all players in the database
   * @implements {cron} - Runs every last day of the month
   * @function job_CollectDonationHistory - Collects the donation history for all players in the database
   * @function job_clanCapitalContributionsHistory - Collects the clan capital contributions for all players in the database
   */
  cron.schedule(
    cronExecutionTime.Every_LastDayOfMonth,
    async () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);

      if (tomorrow.getDate() === 1) {
        // 🃏 Player
        await job_CollectDonationHistory();
        await job_clanCapitalContributionsHistory();

        //🕵️ clan
      }
    },
    {
      timezone: "Europe/Stockholm",
    }
  );

  /**
   * @description Check if a clan is at war
   * @implements {cron} - Runs every 12 hours
   * @function checkIfClanIsAtWar - Checks if a clan is at war
   */
  cron.schedule(
    cronExecutionTime.Every_TwelveHours,
    async () => {
      await checkIfClanIsAtWar();
    },
    { timezone: "Europe/Stockholm" }
  );

  /**
   * @description Check if a clan is active in the Clan War League, if so, it sets up the clan and its members and set collect CWL match data in queue
   */
  cron.schedule(cronExecutionTime.Every_DayFirstWeekOfMonth, async () => {
    await checkIfClanWarLeagueIsActive();
  });

  /**
   * @description Collects the clan capital data from the supercell API and stores it in the database
   * @implements {cron} - Runs every Monday
   * @function job_collectClanCapitalData - Collects the clan capital data from the supercell API and stores it in the database
   */
  cron.schedule(
    cronExecutionTime.Every_Monday,
    async () => {
      await job_collectClanCapitalData();
    },
    { timezone: "Europe/Stockholm" }
  );

  console.log("⏰ | Jobs are scheduled!");
}
