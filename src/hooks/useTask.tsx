import { useState, useEffect, useCallback } from 'react';
import { Task } from '@/src/types/Task';
import { getTasks, saveTasks } from '@/src/utils/storage';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // loads the tasks from async storage
    getTasks().then((stored) => {
      setTasks(stored);
      setLoading(false);
    });
  }, []);

  // Helper function to save Task to storage
  const save = useCallback(async (updated: Task[]) => {
    setTasks(updated);
    await saveTasks(updated);
  }, []);

  const addTask = useCallback(
    async (fields: Omit<Task, 'id'>) => {
      const newTask: Task = { id: crypto.randomUUID(), ...fields };
      await save([...tasks, newTask]);
    },
    [tasks, save],
  );

  const updateTask = useCallback(
    async (updated: Task) => {
      await save(tasks.map((t) => (t.id === updated.id ? updated : t)));
    },
    [tasks, save],
  );

  const deleteTask = useCallback(
    async (id: string) => {
      await save(tasks.filter((t) => t.id !== id));
    },
    [tasks, save],
  );

  const toggleTask = useCallback(
    async (id: string) => {
      await save(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
    },
    [tasks, save],
  );

  return { tasks, loading, addTask, updateTask, deleteTask, toggleTask };
}
