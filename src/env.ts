import { z } from "zod";

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().optional().default(3334),
  SEND_GRID_EMAIL_SENDER_API_KEY: z.string(),
  SEND_GRID_EMAIL_SENDER_ADDRESS: z.string().email(),
  TWILIO_ACCOUNT_SID: z.string(),
  TWILIO_AUTH_TOKEN: z.string(),
  TWILIO_PHONE_NUMBER: z.string(),
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),
  AZURE_STORAGE_ACCOUNT_NAME: z.string(),
  AZURE_STORAGE_ACCOUNT_KEY: z.string(),
  AZURE_BLOB_STORAGE_CONNECTION_STRING: z.string(),
  AZURE_BLOB_STORAGE_TRAININGS_COVERS_CONTAINER_NAME: z.string(),
  AZURE_BLOB_STORAGE_CERTIFICATES_CONTAINER_NAME: z.string(),
  AZURE_BLOB_STORAGE_AVATARS_CONTAINER_NAME: z.string(),
  AZURE_BLOB_STORAGE_COMPANIES_LOGOS_CONTAINER_NAME: z.string(),
  VITE_STORAGE_LIMIT_BRONZE_PLAN: z.coerce.number(),
  VITE_STORAGE_LIMIT_SILVER_PLAN: z.coerce.number(),
  VITE_STORAGE_LIMIT_GOLD_PLAN: z.coerce.number(),
  VITE_FREE_EMPLOYEES_LIMIT_BRONZE_PLAN: z.coerce.number(),
  VITE_FREE_EMPLOYEES_LIMIT_SILVER_PLAN: z.coerce.number(),
  VITE_FREE_EMPLOYEES_LIMIT_GOLD_PLAN: z.coerce.number(),
  PANDA_VIDEO_API_KEY: z.string(),
  OPENAI_API_KEY: z.string(),
  ADMIN_DASHBOARD_URL: z.string(),
  USER_DASHBOARD_URL: z.string(),
  LANDING_PAGE_URL: z.string(),
});

export type TEnvSchema = z.infer<typeof envSchema>;
