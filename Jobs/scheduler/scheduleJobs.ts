import cron from "node-cron";
import { cronExecutionTime } from "../../utils/constants/cronSchedules";
import { job_CollectrophyHistory } from "./player/trophyHistory";
import { job_CollectDonationHistory } from "./player/donationHistory";
import { job_clanCapitalContributionsHistory } from "./player/clanCapitalContributionsHistory";

export function scheduleJobs() {
  cron.schedule(
    cronExecutionTime.Every_SixHours,
    () => {
      console.log(`schedule| Running trophyHistory() in 6 hours`);
      job_CollectrophyHistory();
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
        await job_CollectDonationHistory();
        await job_clanCapitalContributionsHistory();
      }
    },
    {
      timezone: "Europe/Stockholm",
    }
  );

  console.log("⏰ | Jobs are scheduled!");
}
