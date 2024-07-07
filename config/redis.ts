import IORedis from "ioredis";

/*
Terminal command to connect to the redis server:
redis-cli -h {HOSTNAME} -p {PORTNUMBER} -a {PASSWORD}

*/

// 🔌 create a connection to the redis server
const redisConnection = new IORedis({
  port: Number(process.env.REDIS_PORT),
  password: `${process.env.REDIS_PASSWORD}`,
  host: `${process.env.REDIS_HOST}`,
  maxRetriesPerRequest: null,
});

redisConnection.on("connect", () => {
  console.log("redos.ts | connected to redis");
});

redisConnection.on("error", (err) => {
  // todo 📨 send e email
  console.error("redis.ts | error while connecting to redis", err);
});

export { redisConnection };
