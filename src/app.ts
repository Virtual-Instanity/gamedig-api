import { Elysia } from "elysia";
import { rateLimit } from "elysia-rate-limit";
import { createHash, timingSafeEqual } from "node:crypto";
import { config } from "./config";
import { queryController } from "./controllers/query.controller";
import { QueryOptionsSchema } from "./schemas/query.schema";

const MAX_BODY_BYTES = 64 * 1024;

const safeTokenEqual = (a: string, b: string): boolean => {
  const hashA = new Uint8Array(createHash("sha256").update(a).digest());
  const hashB = new Uint8Array(createHash("sha256").update(b).digest());
  return timingSafeEqual(hashA, hashB);
};

const app = new Elysia()
  // Registered first: every request is counted — handler requests via onBeforeHandle,
  // validation/parse/not-found errors via onError
  .use(
    rateLimit({
      duration: config.RATE_LIMIT_WINDOW_SEC * 1000,
      max: config.RATE_LIMIT_MAX,
      errorResponse: new Response(JSON.stringify({ error: "Too many requests" }), {
        status: 429,
        headers: { "Content-Type": "application/json" },
      }),
    })
  )
  // Runs after the rate limiter hook, so rejected (401) requests stay counted
  // and token brute-forcing is rate limited too
  .onBeforeHandle(({ set, request }) => {
    const authorization = request.headers.get("Authorization") ?? "";
    const token = authorization.startsWith("Bearer ") ? authorization.slice(7) : "";

    if (!token || !safeTokenEqual(token, config.API_TOKEN)) {
      set.status = 401;
      return "Unauthorized";
    }
  })
  .post("/api/query", queryController, { body: QueryOptionsSchema })
  .listen({ port: config.APP_PORT, maxRequestBodySize: MAX_BODY_BYTES });

console.log(`API listening on http://${app.server?.hostname}:${app.server?.port}`);
