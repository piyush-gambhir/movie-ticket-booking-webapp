import { config } from "dotenv";

config({ path: ".env" });

/** @type { import("drizzle-kit").Config } */
module.exports = {
  schema: "./lib/db/schemas/*",
  out: "./lib/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DRIZZLE_DATABASE_URL,
  },
};
