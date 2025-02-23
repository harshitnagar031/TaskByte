# TaskByte Setup Guide

## Core Files

### 1. shared/schema.ts
```typescript
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
```

### 2. server/storage.ts
```typescript
import { tasks, categories, type Task, type InsertTask, type Category, type InsertCategory } from "@shared/schema";

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

export class MemStorage implements IStorage {
  private tasks: Map<number, Task>;
  private categories: Map<number, Category>;
  private taskId: number;
  private categoryId: number;

  constructor() {
    this.tasks = new Map();
    this.categories = new Map();
    this.taskId = 1;
    this.categoryId = 1;

    // Add default categories
    this.createCategory({ name: "Work", color: "#0066FF" });
    this.createCategory({ name: "Personal", color: "#FF6B6B" });
    this.createCategory({ name: "Shopping", color: "#00CC99" });
  }

  async getTasks(): Promise<Task[]> {
    return Array.from(this.tasks.values());
  }

  async getTask(id: number): Promise<Task | undefined> {
    return this.tasks.get(id);
  }

  async createTask(insertTask: InsertTask): Promise<Task> {
    const id = this.taskId++;
    const task: Task = { ...insertTask, id };
    this.tasks.set(id, task);
    return task;
  }

  async updateTask(id: number, updates: Partial<InsertTask>): Promise<Task> {
    const task = this.tasks.get(id);
    if (!task) throw new Error("Task not found");

    const updatedTask = { ...task, ...updates };
    this.tasks.set(id, updatedTask);
    return updatedTask;
  }

  async deleteTask(id: number): Promise<void> {
    this.tasks.delete(id);
  }

  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.categoryId++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }

  async deleteCategory(id: number): Promise<void> {
    const category = this.categories.get(id);
    if (!category) {
      throw new Error("Category not found");
    }

    // Update all tasks that use this category to use "general" instead
    for (const task of this.tasks.values()) {
      if (task.category === category.name) {
        await this.updateTask(task.id, { category: "general" });
      }
    }

    this.categories.delete(id);
  }
}

export const storage = new MemStorage();
```

### 3. server/routes.ts
```typescript
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTaskSchema, insertCategorySchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Tasks endpoints
  app.get("/api/tasks", async (_req, res) => {
    const tasks = await storage.getTasks();
    res.json(tasks);
  });

  app.post("/api/tasks", async (req, res) => {
    const parsed = insertTaskSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error });
    }
    const task = await storage.createTask(parsed.data);
    res.json(task);
  });

  app.patch("/api/tasks/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const parsed = insertTaskSchema.partial().safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error });
    }
    const task = await storage.updateTask(id, parsed.data);
    res.json(task);
  });

  app.delete("/api/tasks/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    await storage.deleteTask(id);
    res.status(204).end();
  });

  // Categories endpoints
  app.get("/api/categories", async (_req, res) => {
    const categories = await storage.getCategories();
    res.json(categories);
  });

  app.post("/api/categories", async (req, res) => {
    const parsed = insertCategorySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error });
    }
    const category = await storage.createCategory(parsed.data);
    res.json(category);
  });

  app.delete("/api/categories/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    try {
      await storage.deleteCategory(id);
      res.status(204).end();
    } catch (error) {
      if (error instanceof Error && error.message === "Category not found") {
        res.status(404).json({ error: "Category not found" });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
```

## Frontend Components

### 1. client/src/components/task-form.tsx
```typescript
${task-form.tsx content}
```

### 2. client/src/components/category-form.tsx
```typescript
${category-form.tsx content}
```

### 3. client/src/components/task-filters.tsx
```typescript
${task-filters.tsx content}
```

### 4. client/src/App.tsx
```typescript
${App.tsx content}
```

## Configuration Files

### 1. package.json
```json
${package.json content}
```

### 2. postcss.config.js
```javascript
${postcss.config.js content}
```

### 3. .gitignore
```
${.gitignore content}
```

### 4. client/src/index.css
```css
${index.css content}
```

## Steps to Upload to GitHub

1. Create a new repository on GitHub named "TaskByte"
2. For each file:
   - Navigate to the correct directory in GitHub
   - Click "Add file" > "Create new file"
   - Name the file exactly as shown in the structure
   - Copy and paste the code
   - Commit each file with a clear message

Remember:
- Follow the exact directory structure
- Include all necessary files
- Don't commit any sensitive information
- Test the application locally after cloning

For more detailed information about the project structure and features, refer to the README.md and SETUP.md files.