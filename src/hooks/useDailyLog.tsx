import { useState, useEffect, useCallback } from 'react';
import { DailyLog } from '@/src/types/DailyLog';
import { getDailyLogs, saveDailyLogs } from '@/src/lib/storage';

export function useDailyLogs() {
  const [logs, setLogs] = useState<DailyLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDailyLogs().then((stored) => {
      setLogs(stored);
      setLoading(false);
    });
  }, []);

  const save = useCallback(async (updated: DailyLog[]) => {
    setLogs(updated);
    await saveDailyLogs(updated);
  }, []);

  const addLog = useCallback(
    async (fields: Omit<DailyLog, 'id'>) => {
      const newLog: DailyLog = { id: crypto.randomUUID(), ...fields };
      await save([...logs, newLog]);
    },
    [logs, save],
  );

  const updateLog = useCallback(
    async (updated: DailyLog) => {
      await save(logs.map((l) => (l.id === updated.id ? updated : l)));
    },
    [logs, save],
  );

  const deleteLog = useCallback(
    async (id: string) => {
      await save(logs.filter((l) => l.id !== id));
    },
    [logs, save],
  );

  // Moves a taskId from one log to another, task itself is untouched
  const moveTask = useCallback(
    async (taskId: string, fromLogId: string, toLogId: string) => {
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

  // Returns the log for today's date, or null
  const getTodaysLog = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    return logs.find((l) => l.date === today) ?? null;
  }, [logs]);

  return { logs, loading, addLog, updateLog, deleteLog, moveTask, getTodaysLog };
}
