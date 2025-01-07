import { z } from "zod";

export const env = z.object({
  API_TOKEN: z.string().nonempty(),
  APP_PORT: z.coerce.number(),
});

const parsedEnv = env.safeParse(Bun.env);

if (!parsedEnv.success) {
  throw new Error(parsedEnv.error.message);
}

export const config = parsedEnv.data;
