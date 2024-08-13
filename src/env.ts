import { z } from "zod";

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().optional().default(3334),
  SEND_GRID_EMAIL_SENDER_API_KEY: z.string(),
  SEND_GRID_EMAIL_SENDER_ADDRESS: z.string().email(),
  TWILIO_ACCOUNT_SID: z.string(),
  TWILIO_AUTH_TOKEN: z.string(),
  TWILIO_PHONE_NUMBER: z.string(),
});

export type TEnvSchema = z.infer<typeof envSchema>;
