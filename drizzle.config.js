import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./lib/db/schemas/*",
  out: "./lib/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DRIZZLE_DATABASE_URL,
  },
});
