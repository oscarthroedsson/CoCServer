import { Queue, Worker, Job } from "bullmq";
import { collectClanWar } from "../Jobs/war/ClanWar/collectClanWar";
import { createClient } from "redis";
import { redisConnection } from "../config/redis";

/*
Queue, worker and job, all needs the same name names to work together.
⇛ new Queue("→ collectClanWarInfo ←", {connection: redisConnection});
⇛ new Worker("→ collectClanWarInfo ←",()=>{});
⇛ await testQueue.add("→ collectClanWarInfo ←", ()=>{});
*/

const client = createClient({
  password: process.env.REDIS_PASWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
});

client.on("connect", () => {
  console.log("connected to redis");
});

/**
 * Represents a queue for tester.
 */
const collectClanWarData = new Queue("collectClanWarInfo", {
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
    // collectClanWar(job.data.clanTag);
  },
  { connection: redisConnection, concurrency: 50 }
);

/**
 * @description This function adds a job to the queue to collect clan war data.
 * @param delay number, clanTag string
 * @returns void
 */

export async function addJobb_collectClanWarData(endTime: Date, clanTag: string) {
  if (!redisConnection) console.log("🚨 something wrong with redisConnection");
  const currentTime = new Date();
  const timeToScheduleJob = new Date(endTime.getTime() - 5 * 60 * 1000); // 5min before war ends
  const delayInMs = timeToScheduleJob.getTime() - currentTime.getTime();

  await collectClanWarData.add(
    "collectClanWarInfo",
    { clanTag },
    { removeOnComplete: true, removeOnFail: true, delay: delayInMs }
  );
}

/**
 *
 * @param jobName string collectClanWarInfo | monkey | banana
 * @param clanTag string
 */
export async function doesJobExistsForCollectClanWarData(jobName: string = "collectClanWarInfo", clanTag: string) {
  const jobs = await collectClanWarData.getJobs(["waiting"]);

  const specificJobExists = jobs.some((job) => job.name === jobName && job.data.clanTag === clanTag);
  return specificJobExists;
}

/*
This function only console.log jobs in the queue for me o see. It has nothing to do wih my main goal 🥅
*/
async function getQueueJobs() {
  try {
    const waitingJobs = await collectClanWarData.getJobs("waiting");
    const activeJobs = await collectClanWarData.getJobs("active");
    const completedJobs = await collectClanWarData.getJobs("completed");
    const failedJobs = await collectClanWarData.getJobs("failed");
    const delayedJobs = await collectClanWarData.getJobs("delayed");
    const allJobs = await collectClanWarData.getJobs(["waiting", "active", "completed", "failed", "delayed"]);

    console.log("🥉 Looking at the state of the job");
    waitingJobs.forEach((job) => {
      console.log("💤 Waiting", job.id, job.name, job.data);
    });
    activeJobs.forEach((job) => {
      console.log("🤸🏼 Active", job.id, job.name, job.data);
    });
    completedJobs.forEach((job) => {
      console.log("✅ Completed", job.id, job.name, job.data);
    });
    failedJobs.forEach((job) => {
      console.log("💩 Failed", job.id, job.name, job.data);
    });
    delayedJobs.forEach((job) => {
      console.log();
      console.log("⏰ Delayed", job.id, job.name, job.data);
    });
  } catch (error) {
    console.error("Failed to fetch jobs from queue:", error);
  }
}
