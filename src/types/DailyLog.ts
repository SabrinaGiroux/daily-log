import { Task } from './Task';

export type DailyLog = {
  id: string;
  date: string;
  description: string;
  taskIds: string[];
};
