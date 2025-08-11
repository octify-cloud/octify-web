import { redis } from "@/lib/redis/redis";
import { toInt } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
const redisGet = async (key: string) => {
  return await redis.get(key);
};

const redisSet = async (key: string, value: string, ttlSeconds?: number) => {
  if (ttlSeconds) {
    return await redis.set(key, value, "EX", ttlSeconds);
  }
  return await redis.set(key, value);
};

const redisDel = async (key: string) => {
  return await redis.del(key);
};
let connected = true;
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");
  if (secret != process.env.REDIS_SECRET) {
    return NextResponse.json({
      success: false,
    });
  }
  const action = searchParams.get("action");
  const key = searchParams.get("key") || "";
  const value = searchParams.get("value") || "";
  const ttl =
    searchParams.get("ttl") == "undefinied" ? null : searchParams.get("ttl");

  if (!key || !connected) {
    return NextResponse.json({ error: "Missing key" }, { status: 400 });
  }

  let result;
  try {
    switch (action) {
      case "get":
        result = await redisGet(key);
        break;
      case "set":
        await redisSet(key, value, toInt(ttl) ?? undefined);
        break;
      case "del":
        await redisDel(key);
        break;
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (ex) {
    connected = false;

    redis.disconnect();
  }

  return NextResponse.json({ result });
};
