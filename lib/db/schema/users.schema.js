import {
  pgTable,
  primaryKey,
  text,
  uuid,
  varchar,
  jsonb,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

export const marritalStatusEnum = pgEnum("user_marrital_status", [
  "single",
  "married",
]);
export const genderEnum = pgEnum("user_gender", ["male", "female", "other"]);
export const userStatusEnum = pgEnum("user_status", ["active", "inactive"]);
export const userRoleEnum = pgEnum("user_role", [
  "admin",
  "user",
  "superadmin",
]);

export const users = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  password: varchar("password", { length: 255 }),
  phone: jsonb("phone"),
  dateOfBirth: timestamp("dob"),
  role: varchar("role", { length: 255 }).notNull(),
  status: userStatusEnum("status").notNull().default("active"),
  gender: genderEnum("gender"),
  marritalStatus: marritalStatusEnum("marrital_status"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

// export const accounts = pgTable(
//   "account",
//   {
//     userId: uuid("user_id")
//       .references(() => users.id)
//       .notNull(),
//     type: text("type").notNull(),
//     provider: text("provider").notNull(),
//     providerAccountId: text("providerAccountId").notNull(),
//     refresh_token: text("refresh_token"),
//     access_token: text("access_token"),
//     expires_at: integer("expires_at"),
//     token_type: text("token_type"),
//     scope: text("scope"),
//     id_token: text("id_token"),
//     session_state: text("session_state"),
//   },
//   (account) => ({
//     compoundKey: primaryKey({
//       columns: [account.provider, account.providerAccountId],
//     }),
//   }),
// );

// export const sessions = pgTable("session", {
//   sessionToken: text("sessionToken").primaryKey(),
//   userId: uuid("user_id")
//     .references(() => users.id)
//     .notNull(),
//   expires: timestamp("expires", { mode: "date" }).notNull(),
// });

// export const verificationTokens = pgTable(
//   "verificationToken",
//   {
//     identifier: text("identifier").notNull(),
//     token: text("token").notNull(),
//     expires: timestamp("expires", { mode: "date" }).notNull(),
//   },
//   (verificationToken) => ({
//     compositePk: primaryKey({
//       columns: [verificationToken.identifier, verificationToken.token],
//     }),
//   }),
// );
// export const authenticators = pgTable(
//   "authenticator",
//   {
//     credentialID: text("credentialID").notNull().unique(),
//     userId: uuid("user_id")
//       .references(() => users.id)
//       .notNull(),
//     providerAccountId: text("providerAccountId").notNull(),
//     credentialPublicKey: text("credentialPublicKey").notNull(),
//     counter: integer("counter").notNull(),
//     credentialDeviceType: text("credentialDeviceType").notNull(),
//     credentialBackedUp: boolean("credentialBackedUp").notNull(),
//     transports: text("transports"),
//   },
//   (authenticator) => ({
//     compositePK: primaryKey({
//       columns: [authenticator.userId, authenticator.credentialID],
//     }),
//   }),
// );
