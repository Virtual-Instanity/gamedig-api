import type { Context } from "elysia";
import { GameDig, QueryResult } from "gamedig";
import { config } from "../config";
import type { QueryOptionsBody } from "../schemas/query.schema";

let activeQueries = 0;

export const queryController = async (ctx: Context) => {
  if (activeQueries >= config.MAX_CONCURRENT_QUERIES) {
    ctx.set.status = 429;
    return { error: "Too many concurrent queries" };
  }

  activeQueries++;
  try {
    const options = ctx.body as QueryOptionsBody;
    const result: QueryResult = await GameDig.query(options);

    return result;
  } catch (err: any) {
    ctx.set.status = 500;
    return { error: "Failed to query server", details: err.message };
  } finally {
    activeQueries--;
  }
}
