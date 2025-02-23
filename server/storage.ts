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