import fs from "fs";
import path from "path";
import { Task, CreateTaskDTO, UpdateTaskDTO } from "@/types/task";

const DATA_FILE_PATH = path.join(process.cwd(), "data", "tasks.json");

/**
 * Ensures the data directory and file exist
 */
function ensureDataFile(): void {
  const dir = path.dirname(DATA_FILE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE_PATH)) {
    fs.writeFileSync(DATA_FILE_PATH, "[]", "utf-8");
  }
}

/**
 * Reads all tasks from the JSON file
 */
export function getAllTasks(): Task[] {
  try {
    ensureDataFile();
    const data = fs.readFileSync(DATA_FILE_PATH, "utf-8");
    return JSON.parse(data) as Task[];
  } catch (error) {
    console.error("Error reading tasks:", error);
    return [];
  }
}

/**
 * Writes tasks to the JSON file
 */
function saveTasks(tasks: Task[]): void {
  try {
    ensureDataFile();
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(tasks, null, 2), "utf-8");
  } catch (error) {
    console.error("Error saving tasks:", error);
    throw new Error("Failed to save tasks");
  }
}

/**
 * Gets a single task by ID
 */
export function getTaskById(id: string): Task | null {
  const tasks = getAllTasks();
  return tasks.find((task) => task.id === id) || null;
}

/**
 * Creates a new task
 */
export function createTask(taskData: CreateTaskDTO): Task {
  const tasks = getAllTasks();

  const newTask: Task = {
    id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
    title: taskData.title,
    description: taskData.description,
    status: taskData.status || "todo",
    priority: taskData.priority || "medium",
    dueDate: taskData.dueDate,
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  saveTasks(tasks);

  return newTask;
}

/**
 * Updates an existing task
 */
export function updateTask(id: string, updates: UpdateTaskDTO): Task | null {
  const tasks = getAllTasks();
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return null;
  }

  const updatedTask: Task = {
    ...tasks[taskIndex],
    ...updates,
  };

  tasks[taskIndex] = updatedTask;
  saveTasks(tasks);

  return updatedTask;
}

/**
 * Deletes a task by ID
 */
export function deleteTask(id: string): boolean {
  const tasks = getAllTasks();
  const filteredTasks = tasks.filter((task) => task.id !== id);

  if (filteredTasks.length === tasks.length) {
    return false; // Task not found
  }

  saveTasks(filteredTasks);
  return true;
}
