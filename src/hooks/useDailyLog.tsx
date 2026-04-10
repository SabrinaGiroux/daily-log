import { useState, useEffect, useCallback } from 'react';
import { DailyLog } from '@/src/types/DailyLog';
import { getDailyLogs, saveDailyLogs } from '@/src/lib/storage';

const todaysDate = () => new Date().toLocaleDateString('en-CA');

export function useDailyLogs() {
  const [logs, setLogs] = useState<DailyLog[]>([]);
  const [todaysLog, setTodaysLog] = useState<DailyLog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDailyLogs().then((stored) => {
      const today = todaysDate();
      let existing = stored.find((l) => l.date === today) ?? null;

      // Create today's log if it doesn't exist yet
      if (!existing) {
        existing = { id: crypto.randomUUID(), date: today, description: '', taskIds: [] };
        stored = [...stored, existing];
        saveDailyLogs(stored);
      }

      setLogs(stored);
      setTodaysLog(existing);
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
