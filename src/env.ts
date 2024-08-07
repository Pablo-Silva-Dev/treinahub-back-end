import { z } from "zod";

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().optional().default(3334),
});

export type TEnvSchema = z.infer<typeof envSchema>;
