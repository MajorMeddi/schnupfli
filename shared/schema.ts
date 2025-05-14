import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const schnupfsprueche = pgTable("schnupfsprueche", {
  id: uuid("id").defaultRandom().primaryKey(),
  content: text("content").notNull(),
  author: text("author").notNull(),
  dialect: text("dialect").default("standard"),
  region: text("region"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Type for the schnupfsprueche table
export type Schnupfspruch = typeof schnupfsprueche.$inferSelect;
export type NewSchnupfspruch = typeof schnupfsprueche.$inferInsert;