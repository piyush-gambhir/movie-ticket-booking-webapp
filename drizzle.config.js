import { defineConfig } from "drizzle-kit";
import "@/envConfig.js";

export default defineConfig({
  dialect: "postgresql",
  schema: "./lib/db/schema/*.schema.js",
  out: "./lib/db/migrations",
  dbCredentials: {
    url: process.env.DRIZZLE_DATABASE_URL,
  },
  verbose: true,
  strict: true,
});
