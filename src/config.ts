import { t, type Static } from "elysia";
import { Value } from "@sinclair/typebox/value";

const EnvSchema = t.Object({
  API_TOKEN: t.String({ minLength: 1 }),
  APP_PORT: t.Number({ default: 3000 }),
  RATE_LIMIT_MAX: t.Number({ default: 30 }),
  RATE_LIMIT_WINDOW_SEC: t.Number({ default: 60 }),
  MAX_CONCURRENT_QUERIES: t.Number({ default: 5 }),
});

// Bun.env is not a plain object, so Value.Convert needs a shallow copy
const parsedEnv = Value.Default(EnvSchema, Value.Convert(EnvSchema, { ...Bun.env }));

if (!Value.Check(EnvSchema, parsedEnv)) {
  const issues = [...Value.Errors(EnvSchema, parsedEnv)]
    .map((error) => `${error.path}: ${error.message}`)
    .join("; ");
  throw new Error(`Invalid environment configuration: ${issues}`);
}

export const config = parsedEnv as Static<typeof EnvSchema>;
