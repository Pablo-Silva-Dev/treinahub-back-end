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
  AZURE_BLOB_STORAGE_VIDEO_CLASSES_CONTAINER_NAME: z.string(),
  AZURE_BLOB_STORAGE_TRAININGS_COVERS_CONTAINER_NAME: z.string(),
  AZURE_BLOB_STORAGE_CERTIFICATES_CONTAINER_NAME: z.string(),
  AZURE_BLOB_STORAGE_BITMOVIN_OUTPUTS_CONTAINER_NAME: z.string(),
  AZURE_BLOB_STORAGE_AVATARS_CONTAINER_NAME: z.string(),
  BITMOVIN_API_KEY: z.string(),
  CERTIFICATE_PATH: z.string(),
  CERTIFICATE_KEY_PATH: z.string(),
});

export type TEnvSchema = z.infer<typeof envSchema>;
