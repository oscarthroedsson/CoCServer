import { Queue, Worker, Job } from "bullmq";
import IORedis from "ioredis";
import { collectClanWar } from "../Jobs/war/ClanWar/collectClanWar";
import { createClient } from "redis";
import { redisConnection } from "../config/redis";

/*


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
 * Represents a test worker.
 */

const testWorker = new Worker(
  "collectClanWarInfo",
  async (job) => {
    console.log("🏓 Inside: testWorker = new Worker");
    collectClanWar();
    console.log("initiated collectClanWar");
  },
  { connection: redisConnection, concurrency: 50 }
);

testWorker.on("error", (err) => {
  console.error("🚨 Error:", err);
});

testWorker.on("completed", (job: Job) => {
  console.log("🏓 Completed", job.id, job.name, job.data);
});

/**
 * Adds a job to the test queue.
 * If the redisConnection is not available, it logs an error message.
 */
async function addJobb() {
  if (!redisConnection) console.log("something wrong with redisConnection");

  await testQueue.add(
    "collectClanWarInfo",
    async (job: { id: any }) => {
      console.log("🏓 Inside: testWorker = new Worker");
      // Simulate work
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate 2 seconds of work
      console.log("Work completed for job:", job.id);
      return { result: "Job completed successfully" };
    }
    // { removeOnComplete: true, removeOnFail: true }
  );
  getQueueJobs();
}
addJobb();

async function getQueueJobs() {
  try {
    const waitingJobs = await testQueue.getJobs("waiting");
    const activeJobs = await testQueue.getJobs("active");
    const completedJobs = await testQueue.getJobs("completed");
    const failedJobs = await testQueue.getJobs("failed");
    const delayedJobs = await testQueue.getJobs("delayed");
    const allJobs = await testQueue.getJobs(["waiting", "active", "completed", "failed", "delayed"]);

    testWorker.on("completed", (job: Job) => {
      console.log("🏓 Completed", job.id, job.name, job.data);
    });

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
