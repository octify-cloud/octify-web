import Redis from "ioredis";
import { toInt } from "../utils";
const redis = new Redis({
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  host: process.env.REDIS_HOST,
  port: toInt(process.env.REDIS_PORT) ?? 0,
});

export { redis };
