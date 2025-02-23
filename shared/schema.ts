import { pgTable, text, serial, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  dueDate: timestamp("due_date"),
  priority: integer("priority").notNull().default(1),
  status: text("status").notNull().default("pending"),
  category: text("category").notNull().default("general"),
  completed: boolean("completed").notNull().default(false),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  color: text("color").notNull(),
});

export const insertTaskSchema = createInsertSchema(tasks, {
  description: z.string().nullable().optional(),
  dueDate: z.string().nullable().optional(),
}).pick({
  title: true,
  description: true,
  dueDate: true,
  priority: true,
  status: true,
  category: true,
  completed: true,
});

export const insertCategorySchema = createInsertSchema(categories).pick({
  name: true,
  color: true,
});

export type InsertTask = z.infer<typeof insertTaskSchema>;
export type Task = typeof tasks.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;