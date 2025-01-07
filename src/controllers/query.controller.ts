import { Context } from "hono";
import { GameDig, QueryOptions, QueryResult } from "gamedig";

export const queryController = async (ctx: Context) => {
  try {
    const options: QueryOptions = await ctx.req.json();
    const result: QueryResult = await GameDig.query(options);

    return ctx.json(result);
  } catch (err: any) {
    return ctx.json(
      { error: "Failed to query server", details: err.message },
      500
    );
  }
}
