import { useState, useEffect, useCallback } from 'react';
import { Task } from '@/src/types/Task';
import { DailyLog } from '@/src/types/DailyLog';
import { getTasks, saveTasks } from '@/src/lib/storage';

type Props = {
  todaysLog: DailyLog | null;
  updateLog: (log: DailyLog) => Promise<void>;
};

export function useTasks({ todaysLog, updateLog }: Props) {
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [tasksLoading, setLoading] = useState(true);

  useEffect(() => {
    getTasks().then((stored) => {
      setAllTasks(stored);
      setLoading(false);
    });
  }, []);

  const save = useCallback(async (updated: Task[]) => {
    setAllTasks(updated);
    await saveTasks(updated);
  }, []);

  // Only tasks belonging to today's log
  const tasks = todaysLog ? allTasks.filter((t) => todaysLog.taskIds.includes(t.id)) : [];

  const addTask = useCallback(
    async (fields: Omit<Task, 'id'>) => {
      if (!todaysLog) return;
      const newTask: Task = { id: crypto.randomUUID(), ...fields };
      // Save the task itself
      await save([...allTasks, newTask]);
      // Add its id to today's log
      await updateLog({ ...todaysLog, taskIds: [...todaysLog.taskIds, newTask.id] });
    },
    [allTasks, todaysLog, updateLog, save],
  );

  const updateTask = useCallback(
    async (updated: Task) => {
      await save(allTasks.map((t) => (t.id === updated.id ? updated : t)));
    },
    [allTasks, save],
  );

  const deleteTask = useCallback(
    async (id: string) => {
      if (!todaysLog) return;
      // Remove from task store
      await save(allTasks.filter((t) => t.id !== id));
      // Remove from today's log
      await updateLog({ ...todaysLog, taskIds: todaysLog.taskIds.filter((tid) => tid !== id) });
    },
    [allTasks, todaysLog, updateLog, save],
  );

  const toggleTask = useCallback(
    async (id: string) => {
      await save(allTasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
    },
    [allTasks, save],
  );

  return { tasks, tasksLoading, addTask, updateTask, deleteTask, toggleTask };
}
