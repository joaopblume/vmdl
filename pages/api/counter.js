import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function handler(req, res) {
  if (req.method === "GET") {
    const count = await redis.get("vamo_dale") || 0;
    return res.json({ count });
  }

  if (req.method === "POST") {
    const current = (await redis.get("vamo_dale")) || 0;
    const newCount = current + 1;
    await redis.set("vamo_dale", newCount);
    return res.json({ count: newCount });
  }

  res.status(405).end();
}
