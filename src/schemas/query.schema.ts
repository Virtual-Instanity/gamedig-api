import { t, type Static } from "elysia";

export const QueryOptionsSchema = t.Object({
  type: t.String({ minLength: 1 }),
  host: t.String({ minLength: 1 }),
  port: t.Optional(t.Number()),
  maxRetries: t.Optional(t.Number()),
  socketTimeout: t.Optional(t.Number()),
  attemptTimeout: t.Optional(t.Number()),
  givenPortOnly: t.Optional(t.Boolean()),
  ipFamily: t.Optional(t.Union([t.Literal(0), t.Literal(4), t.Literal(6)])),
  debug: t.Optional(t.Boolean()),
  portCache: t.Optional(t.Boolean()),
  stripColors: t.Optional(t.Boolean()),
  noBreadthOrder: t.Optional(t.Boolean()),
  checkOldIDs: t.Optional(t.Boolean()),
  // Valve
  requestRules: t.Optional(t.Boolean()),
  requestRulesRequired: t.Optional(t.Boolean()),
  requestPlayersRequired: t.Optional(t.Boolean()),
  // Discord
  guildId: t.Optional(t.String()),
  // Nadeo
  login: t.Optional(t.String()),
  // Nadeo / Palworld
  password: t.Optional(t.String()),
  // Teamspeak 3
  teamspeakQueryPort: t.Optional(t.Number()),
  // Terraria
  token: t.Optional(t.String()),
  // Palworld
  username: t.Optional(t.String()),
});

export type QueryOptionsBody = Static<typeof QueryOptionsSchema>;
