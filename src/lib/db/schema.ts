import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, boolean, index, uuid } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  role: text("role"),
  banned: boolean("banned").default(false),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires"),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    impersonatedBy: text("impersonated_by"),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const problem = pgTable("problem", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  fileUrl: text("file_url").notNull(),
  tags: text("tags").array().default([]),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
})

export const reply=pgTable("reply",{
  id:uuid("id").defaultRandom().primaryKey(),
  name:text("name").notNull(),
  description:text("description"),
  isApproved:boolean("is_approved"),
  userId:text("user_id").references(()=>user.id,{onDelete:"cascade"}),
  problemId:uuid("problem_id").references(()=>problem.id,{onDelete:"cascade"}),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
})

export const notification=pgTable("notification",{
  id:uuid("id").defaultRandom().primaryKey(),
  name:text("name").notNull(),
  problemTitle:text("problem_title").notNull(),
  isApproved:boolean("is_approved"),
  userId:text("user_id").references(()=>user.id,{onDelete:"cascade"}),
  problemId:uuid("problem_id").references(()=>problem.id,{onDelete:"cascade"}),
  replyId:uuid("reply_id").references(()=>reply.id,{onDelete:"cascade"}),
})

// relation
export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  problems:many(problem),
  replies:many(reply),
  notifications:many(notification),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const problemRelation=relations(problem,({one,many})=>({
  user:one(user,{
    fields:[problem.userId],
    references:[user.id]
  }),
  replies:many(reply),
  notifications:many(notification),
}))

export const replyRelation=relations(reply,({one})=>({
  user:one(user,{
    fields:[reply.userId],
    references:[user.id]
  }),
  problem:one(problem,{
    fields:[reply.problemId],
    references:[problem.id]
  }),
  notification: one(notification)
}))

export const notificationRelation=relations(notification,({one,many})=>({
  user:one(user,{
    fields:[notification.userId],
    references:[user.id]
  }),
  problem:one(problem,{
    fields:[notification.problemId],
    references:[problem.id]
  }),
  reply:one(reply,{
    fields:[notification.replyId],
    references:[reply.id]
  }),
}))