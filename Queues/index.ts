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
  password: "MBvK0hGBtH3OEebTlnzjnXL83LTi4nWd",
  socket: {
    host: "redis-18505.c328.europe-west3-1.gce.redns.redis-cloud.com",
    port: 18505,
  },
});

client.on("connect", () => {
  console.log("connected to redis");
});

/**
 * Represents a queue for tester.
 */
const testQueue = new Queue("collectClanWarInfo", {
  connection: redisConnection,
});

/**
 Creates a new worker instance. The name of the worker and the logic is the most important. Create it, write the logic then leave it alone. 
 */
new Worker(
  "collectClanWarInfo",
  async (job) => {
    // The worker should contain the logic that needs to be executed for each job
    console.log("🥈 Inside worker");
    collectClanWar();
  },
  { connection: redisConnection, concurrency: 50 }
);

/**
 * Adds a job to the test queue.
 * If the redisConnection is not available, it logs an error message.
 */
async function addJobb() {
  if (!redisConnection) console.log("something wrong with redisConnection");

  await testQueue.add(
    "collectClanWarInfo",
    async (job: { id: any }) => {
      console.log("🥇 Adding my Job");
      // Simulate work
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate 2 seconds of work
      return { result: "Job completed successfully" };
    },
    { removeOnComplete: true, removeOnFail: true, delay: 1000 }
  );
  getQueueJobs();
}
addJobb();

/*
This function only console.log jobs in the queue for me o see. It has nothing to do wih my main goal 🥅
*/
async function getQueueJobs() {
  try {
    const waitingJobs = await testQueue.getJobs("waiting");
    const activeJobs = await testQueue.getJobs("active");
    const completedJobs = await testQueue.getJobs("completed");
    const failedJobs = await testQueue.getJobs("failed");
    const delayedJobs = await testQueue.getJobs("delayed");
    const allJobs = await testQueue.getJobs(["waiting", "active", "completed", "failed", "delayed"]);

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
