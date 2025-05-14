import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Base user schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  sprueche: many(sprueche),
}));

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Schnupfspruch schema
export const sprueche = pgTable("sprueche", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  eingereicht_von: text("eingereicht_von"),
  status: text("status").notNull().default("zur_pruefung"),
  erstellt_am: timestamp("erstellt_am").defaultNow().notNull(),
});

export const sprucheRelations = relations(sprueche, ({ }) => ({
  // We could add relations to users if we want to track who submitted each spruch
  // but for now we're just storing the name as a string
}));

export const insertSpruchSchema = createInsertSchema(sprueche).pick({
  text: true,
  eingereicht_von: true,
}).transform((data) => {
  // Convert empty string to null for optional fields
  return {
    ...data,
    eingereicht_von: data.eingereicht_von || null,
  };
});

export type InsertSpruch = z.infer<typeof insertSpruchSchema>;
export type Spruch = typeof sprueche.$inferSelect;
