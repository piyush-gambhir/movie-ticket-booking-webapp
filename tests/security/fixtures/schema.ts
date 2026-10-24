import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

enum Status {
  Ready = "ready",
}

export const securityLoaderFixture = pgTable("security_loader_fixture", {
  id: serial("id").primaryKey(),
  status: text("status").notNull().default(Status.Ready),
  count: integer("count").default(7),
});
