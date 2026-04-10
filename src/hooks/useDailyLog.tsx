import { useState, useEffect, useCallback } from 'react';
import { DailyLog } from '@/src/types/DailyLog';
import { getDailyLogs, getTasks, saveDailyLogs } from '@/src/lib/storage';
import { Task } from '../types/Task';

const todaysDate = () => new Date().toLocaleDateString('en-CA');

export function useDailyLogs() {
  const [logs, setLogs] = useState<DailyLog[]>([]);
  const [todaysLog, setTodaysLog] = useState<DailyLog | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Promise.all([getDailyLogs(), getTasks()]).then(([stored, storedTasks]) => {
      const today = todaysDate();
      let logs = stored;
      let todayLog = logs.find((l) => l.date === today) ?? null;

      if (!todayLog) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayString = yesterday.toLocaleDateString('en-CA');
        const yesterdayLog = logs.find((l: DailyLog) => l.date === yesterdayString);

        // Only carry over incomplete tasks
        const carriedTaskIds = (yesterdayLog?.taskIds ?? []).filter((id: string) => {
          const task = storedTasks.find((t: Task) => t.id === id);
          return task && !task.completed;
        });

        todayLog = {
          id: crypto.randomUUID(),
          date: today,
          description: '',
          taskIds: carriedTaskIds,
        };

        logs = [...logs, todayLog];
        saveDailyLogs(logs);
      }

      setLogs(logs);
      setTodaysLog(todayLog);
      setLoading(false);
    });
  }, []);

  const save = useCallback(async (updated: DailyLog[]) => {
    setLogs(updated);
    await saveDailyLogs(updated);
    // Keep todaysLog in sync
    const today = todaysDate();
    setTodaysLog(updated.find((l) => l.date === today) ?? null);
  }, []);

  const updateLog = useCallback(
    async (updated: DailyLog) => {
      await save(logs.map((l) => (l.id === updated.id ? updated : l)));
    },
    [logs, save],
  );

  const updateDescription = useCallback(
    async (description: string) => {
      if (!todaysLog) return;
      await updateLog({ ...todaysLog, description });
    },
    [todaysLog, updateLog],
  );

  const moveTask = useCallback(
    async (taskId: string, fromLogId: string, toLogId: string) => {
      if (fromLogId === toLogId) return;
      await save(
        logs.map((log) => {
          if (log.id === fromLogId)
            return { ...log, taskIds: log.taskIds.filter((id) => id !== taskId) };
          if (log.id === toLogId) return { ...log, taskIds: [...log.taskIds, taskId] };
          return log;
        }),
      );
    },
    [logs, save],
  );

  return { logs, todaysLog, loading, updateDescription, updateLog, moveTask };
}
