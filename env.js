import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

import "@/envConfig.js";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    AUTH_SECRET: z.string(),
    AUTH_GOOGLE_ID: z.string(),
    AUTH_GOOGLE_SECRET: z.string(),
    RESEND_API_KEY: z.string(),
    DRIZZLE_DATABASE_URL: z.string().url(),
    TMDB_API_KEY: z.string(),
    TYPESENSE_HOST: z.string(),
    TYPESENSE_PORT: z.string(),
    TYPESENSE_PROTOCOL: z.string(),
    TYPESENSE_API_KEY: z.string(),
  },

  client: {
    NEXT_PUBLIC_APP_URL: z.string().url(),
    GOOGLE_TAG_MANAGER_ID: z.string(),
  },

  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    GOOGLE_TAG_MANAGER_ID: process.env.GOOGLE_TAG_MANAGER_ID,
    DRIZZLE_DATABASE_URL: process.env.DRIZZLE_DATABASE_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
    AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    TMDB_API_KEY: process.env.TMDB_API_KEY,
    TYPESENSE_HOST: process.env.TYPESENSE_HOST,
    TYPESENSE_PORT: process.env.TYPESENSE_PORT,
    TYPESENSE_PROTOCOL: process.env.TYPESENSE_PROTOCOL,
    TYPESENSE_API_KEY: process.env.TYPESENSE_API_KEY,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
