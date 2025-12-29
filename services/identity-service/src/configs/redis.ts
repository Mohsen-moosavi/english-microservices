import Redis from "ioredis";
import { configs } from "./env.config";

const redis = new Redis(configs.redis.urI);

redis.on("connect", () => {
  console.log("✅ Redis connected");
});

redis.on("error", (err) => {
  console.error("❌ Redis error:", err);
});

export default redis;
