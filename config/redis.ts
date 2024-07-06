import IORedis from "ioredis";

const redisConnection = new IORedis({
  port: 18505,
  password: "MBvK0hGBtH3OEebTlnzjnXL83LTi4nWd",
  host: "redis-18505.c328.europe-west3-1.gce.redns.redis-cloud.com",
  maxRetriesPerRequest: null,
});

redisConnection.on("connect", () => {
  console.log("redos.ts | connected to redis");
});

export { redisConnection };
