import { redisConnection } from "../config/redis";
import { Queue, Worker, Job } from "bullmq";

// import { createClient } from "redis";

import { collectClanWarLeaugeMatch } from "../Jobs/war/ClanWarLeague/collectClanWarLeaugeMatch";
import { collectClanWar } from "../Jobs/war/ClanWar/collectClanWar";

/**
 * Represents a queue for tester.
 */
const collectClanWarData = new Queue("collectClanWarInfo", {
  connection: redisConnection,
});
const collectClanWarLeagueData = new Queue("collectClanWarLeagueInfo", {
  connection: redisConnection,
});

/**
 Creates a new worker instance. The name of the worker and the logic is the most important. Create it, write the logic then leave it alone. 
 */
new Worker(
  "collectClanWarInfo",
  async (job) => {
    // The worker should contain the logic that needs to be executed for each job
    console.log("🏁 Worker was run", job.data.clanTag);
    collectClanWar(job.data.clanTag);
  },
  { connection: redisConnection, concurrency: 50 }
);

new Worker(
  "collectClanWarLeagueInfo",
  async (job) => {
    console.log("🏁 Worker collectClanWarLeagueInfo was run", job.data.clanTag);
    await collectClanWarLeaugeMatch(job.data.groupID, job.data.roundIndex, job.data.clanTag, job.data.warTag);
  },
  { connection: redisConnection, concurrency: 50 }
);

/**
 * @description This function adds a job to the queue to collect clan war data.
 * @param delay number, clanTag string
 * @returns void
 */

export async function addJobb_collectClanWarData(endTime: Date, clanTag: string) {
  if (!redisConnection) return;
  /*
  📚 Looking which today is, and calculate how many ms it is left to 5min before the war ends and set that as a delay.
  Then scheduale the job to run at that time.
  */
  const currentTime = new Date();
  const timeToScheduleJob = new Date(endTime.getTime() - 5 * 60 * 1000); // 5min before war ends
  const delayInMs = timeToScheduleJob.getTime() - currentTime.getTime();
  const jobExist = await doesJobExistsForCollectClanWarData("collectClanWarInfo", clanTag);
  if (jobExist) return;

  await collectClanWarData.add(
    "collectClanWarInfo",
    { clanTag },
    { removeOnComplete: true, removeOnFail: true, delay: delayInMs }
  );
}

export async function addJob_collectClanWarLeagueData(
  groupID: number,
  roundIndex: number,
  clanTag: string,
  roundEndTime: Date,
  warTag: string
) {
  console.log("💼 ADDING JOB 💼 ");
  const currentTime = new Date();
  const timeToScheduleJob = new Date(roundEndTime.getTime() - 5 * 60 * 1000); // 5min before war ends
  const delayInMs = timeToScheduleJob.getTime() - currentTime.getTime();
  const jobExist = await doesJobExistsForCollectClanWarLeagueData("collectClanWarLeagueInfo", clanTag);
  if (jobExist) return;
  console.info({ groupID, roundIndex, clanTag, roundEndTime, warTag, delayInMs });

  await collectClanWarLeagueData.add(
    "collectClanWarLeagueInfo",
    { groupID, roundIndex, clanTag, warTag },
    { removeOnComplete: true, removeOnFail: true, delay: delayInMs }
  );
}

/**
 *
 * @param jobName string collectClanWarInfo | monkey | banana
 * @param clanTag string
 */
export async function doesJobExistsForCollectClanWarData(jobName: string, clanTag: string) {
  const jobs = await collectClanWarData.getJobs(["waiting"]);
  if (!jobName) throw new Error("🚨 jobName is missing");

  const specificJobExists = jobs.some((job) => job.name === jobName && job.data.clanTag === clanTag);
  return !!specificJobExists;
}

export async function doesJobExistsForCollectClanWarLeagueData(jobName: string, clanTag: string) {
  const jobs = await collectClanWarLeagueData.getJobs(["waiting"]);
  if (!jobName) throw new Error("🚨 jobName is missing");

  const specificJobExists = jobs.some((job) => job.name === jobName && job.data.clanTag === clanTag);
  return !!specificJobExists;
}

export async function logAndRemoveJobs(queueName: string) {
  const jobs = await collectClanWarLeagueData.getJobs(["waiting", "delayed"]);

  if (jobs.length === 0) {
    console.log(`Inga jobb väntar i kön "${queueName}"`);
    return;
  }

  console.log(`Följande jobb väntar i kön "${queueName}":`);
  jobs.forEach((job) => {
    console.log(`Jobb ID: ${job.id}, Data:`, job.data);
  });

  // Ta bort alla väntande och försenade jobb
  await Promise.all(jobs.map((job) => job.remove()));
  console.log(`Alla jobb i kön "${queueName}" har tagits bort.`);
}
