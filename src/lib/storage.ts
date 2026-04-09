import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types/Task';
import { DailyLog } from '../types/DailyLog';

const KEYS = {
  TASKS: 'tasks',
  DAILY_LOGS: 'daily_logs',
};

// Tasks
export async function getTasks(): Promise<Task[]> {
  const stored = await AsyncStorage.getItem(KEYS.TASKS);
  return stored ? JSON.parse(stored) : [];
}

export async function saveTasks(tasks: Task[]): Promise<void> {
  await AsyncStorage.setItem(KEYS.TASKS, JSON.stringify(tasks));
}

export async function addTask(task: Task): Promise<void> {
  const tasks = await getTasks();
  await saveTasks([...tasks, task]);
}

export async function updateTask(updated: Task): Promise<void> {
  const tasks = await getTasks();
  await saveTasks(tasks.map((t) => (t.id === updated.id ? updated : t)));
}

export async function deleteTask(id: string): Promise<void> {
  const tasks = await getTasks();
  await saveTasks(tasks.filter((t) => t.id !== id));
}

// Daily Logs
export async function getDailyLogs(): Promise<DailyLog[]> {
  const stored = await AsyncStorage.getItem(KEYS.DAILY_LOGS);
  return stored ? JSON.parse(stored) : [];
}

export async function saveDailyLogs(logs: DailyLog[]): Promise<void> {
  await AsyncStorage.setItem(KEYS.DAILY_LOGS, JSON.stringify(logs));
}

export async function addDailyLog(log: DailyLog): Promise<void> {
  const logs = await getDailyLogs();
  await saveDailyLogs([...logs, log]);
}

export async function updateDailyLog(updated: DailyLog): Promise<void> {
  const logs = await getDailyLogs();
  await saveDailyLogs(logs.map((l) => (l.id === updated.id ? updated : l)));
}

export async function deleteDailyLog(id: string): Promise<void> {
  const logs = await getDailyLogs();
  await saveDailyLogs(logs.filter((l) => l.id !== id));
}
