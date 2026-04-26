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
      let updatedLogs = stored;
      let todayLog = updatedLogs.find((l) => l.date === today) ?? null;

      if (!todayLog) {
        const yesterdayDate = new Date(`${today}T00:00:00`);
        yesterdayDate.setDate(yesterdayDate.getDate() - 1);

        // Find yesterday's log using the date string
        const yesterdayString = yesterdayDate.toLocaleDateString('en-CA');
        const yesterdayLog = updatedLogs.find((l: DailyLog) => l.date === yesterdayString);

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

        updatedLogs = [...updatedLogs, todayLog];
        saveDailyLogs(updatedLogs);
      }

      setLogs(updatedLogs);
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

  const rescheduleTask = useCallback(
    async (taskId: string, fromLogId: string, toDate: string) => {
      let targetLog = logs.find((l) => l.date === toDate);
      let updatedLogs = logs;

      if (!targetLog) {
        targetLog = { id: crypto.randomUUID(), date: toDate, description: '', taskIds: [] };
        updatedLogs = [...logs, targetLog];
      }

      await save(
        updatedLogs.map((log) => {
          if (log.id === fromLogId)
            return { ...log, taskIds: log.taskIds.filter((id) => id !== taskId) };
          if (log.date === toDate) return { ...log, taskIds: [...log.taskIds, taskId] };
          return log;
        }),
      );
    },
    [logs, save],
  );

  return { logs, todaysLog, loading, rescheduleTask, updateDescription, updateLog, moveTask };
}
