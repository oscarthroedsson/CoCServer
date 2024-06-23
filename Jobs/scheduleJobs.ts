import cron from "node-cron";
import { cronExecutionTime } from "../utils/constants/cronSchedules";
import { job_CollectrophyHistory } from "./player/trophyHistory";
import { job_CollectDonationHistory } from "./player/donationHistory";
import { job_clanCapitalContributionsHistory } from "./player/clanCapitalContributionsHistory";
import { job_leavesAndJoinsClan } from "./clan/leavesAndJoinsClan";
import { checkIfClanIsAtWar } from "./war/ClanWar/checkIfClanIsAtWar";

export function scheduleJobs() {
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
   * @description Check if clan is at war
   */
  cron.schedule(
    cronExecutionTime.Every_TwelveHours,
    async () => {
      const data = await checkIfClanIsAtWar();
    },
    {
      timezone: "Europe/Stockholm",
    }
  );

  cron.schedule(
    cronExecutionTime.Every_Monday,
    async () => {
      // Collect all the clans we have in the database
      // Check their Clan Capital Data
      // Add all clans and members to the DB
      // THEN RUN THE JOB
    },
    {}
  );

  console.log("⏰ | Jobs are scheduled!");
}
