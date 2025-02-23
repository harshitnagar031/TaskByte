import { tasks, categories, type Task, type InsertTask, type Category, type InsertCategory } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Task operations
  getTasks(): Promise<Task[]>;
  getTask(id: number): Promise<Task | undefined>;
  createTask(task: InsertTask): Promise<Task>;
  updateTask(id: number, task: Partial<InsertTask>): Promise<Task>;
  deleteTask(id: number): Promise<void>;

  // Category operations
  getCategories(): Promise<Category[]>;
  createCategory(category: InsertCategory): Promise<Category>;
  deleteCategory(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getTasks(): Promise<Task[]> {
    return await db.select().from(tasks);
  }

  async getTask(id: number): Promise<Task | undefined> {
    const [task] = await db.select().from(tasks).where(eq(tasks.id, id));
    return task;
  }

  async createTask(insertTask: InsertTask): Promise<Task> {
    const [task] = await db
      .insert(tasks)
      .values({
        ...insertTask,
        dueDate: insertTask.dueDate ? new Date(insertTask.dueDate) : null,
      })
      .returning();
    return task;
  }

  async updateTask(id: number, updates: Partial<InsertTask>): Promise<Task> {
    const [task] = await db
      .update(tasks)
      .set({
        ...updates,
        dueDate: updates.dueDate ? new Date(updates.dueDate) : undefined,
      })
      .where(eq(tasks.id, id))
      .returning();
    if (!task) throw new Error("Task not found");
    return task;
  }

  async deleteTask(id: number): Promise<void> {
    await db.delete(tasks).where(eq(tasks.id, id));
  }

  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const [category] = await db
      .insert(categories)
      .values(insertCategory)
      .returning();
    return category;
  }

  async deleteCategory(id: number): Promise<void> {
    const [category] = await db
      .select()
      .from(categories)
      .where(eq(categories.id, id));

    if (!category) {
      throw new Error("Category not found");
    }

    // First update all tasks in this category to use "general"
    await db
      .update(tasks)
      .set({ category: "general" })
      .where(eq(tasks.category, category.name));

    // Then delete the category
    await db.delete(categories).where(eq(categories.id, id));
  }
}

export const storage = new DatabaseStorage();