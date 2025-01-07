import { Hono } from "hono";
import { bearerAuth } from "hono/bearer-auth";
import { zValidator } from "@hono/zod-validator";
import { config } from "./config";
import { queryController } from "./controllers/query.controller";
import { QueryOptionsSchema } from "./schemas/query.schema";

const app = new Hono();
const token = config.API_TOKEN;

app.use("*", bearerAuth({ token }));

app.post("/api/query", zValidator("json", QueryOptionsSchema), queryController);

export default app;
