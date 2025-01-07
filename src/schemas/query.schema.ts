import { z } from "zod";
import { QueryOptions } from "gamedig";

export const QueryOptionsSchema: z.ZodType<QueryOptions> = z.object({
  type: z.string().nonempty("The 'type' parameter is required."),
  host: z.string().nonempty("The 'host' parameter is required."),
  port: z.number().optional(),
  maxRetries: z.number().optional(),
  socketTimeout: z.number().optional(),
  attemptTimeout: z.number().optional(),
  givenPortOnly: z.boolean().optional(),
  ipFamily: z.union([z.literal(0), z.literal(4), z.literal(6)]).optional(),
  debug: z.boolean().optional(),
  portCache: z.boolean().optional(),
  stripColors: z.boolean().optional(),
  noBreadthOrder: z.boolean().optional(),
  checkOldIDs: z.boolean().optional(),
  // Valve
  requestRules: z.boolean().optional(),
  requestRulesRequired: z.boolean().optional(),
  requestPlayersRequired: z.boolean().optional(),
  // Discord
  guildId: z.string().optional(),
  // Nadeo
  login: z.string().optional(),
  // Nadeo / Palworld
  password: z.string().optional(),
  // Teamspeak 3
  teamspeakQueryPort: z.number().optional(),
  // Terraria
  token: z.string().optional(),
  // Palworld
  username: z.string().optional(),
});
