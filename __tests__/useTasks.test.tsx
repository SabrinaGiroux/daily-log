import { renderHook, act, waitFor } from '@testing-library/react-native';
import { useTasks } from '@/src/hooks/useTask';
import { getTasks, saveTasks } from '@/src/lib/storage';
import { DailyLog } from '@/src/types/DailyLog';
import { Task } from '@/src/types/Task';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('@/src/lib/storage', () => ({
  getTasks: jest.fn(),
  saveTasks: jest.fn(),
}));

const mockTask = (overrides?: Partial<Task>): Task => ({
  id: 'task-1',
  title: 'Test task',
  priority: 'High',
  time: '1h',
  feeling: 'Happy',
  completed: false,
  ...overrides,
});

const mockLog = (overrides?: Partial<DailyLog>): DailyLog => ({
  id: 'log-1',
  date: '2026-04-09',
  description: '',
  taskIds: [],
  ...overrides,
});

const mockUpdateLog = jest.fn();

const defaultProps = (logOverrides?: Partial<DailyLog>) => ({
  todaysLog: mockLog(logOverrides),
  updateLog: mockUpdateLog,
});

beforeEach(() => {
  jest.clearAllMocks();
  (getTasks as jest.Mock).mockResolvedValue([]);
  (saveTasks as jest.Mock).mockResolvedValue(undefined);
  mockUpdateLog.mockResolvedValue(undefined);
});

describe('useTasks — loading', () => {
  it('starts with loading true and tasks empty', () => {
    (getTasks as jest.Mock).mockReturnValue(new Promise(() => {})); // never resolves
    const { result } = renderHook(() => useTasks(defaultProps()));
    expect(result.current.tasksLoading).toBe(true);
    expect(result.current.tasks).toEqual([]);
  });

  it('sets loading to false after tasks load', async () => {
    (getTasks as jest.Mock).mockResolvedValue([]);
    const { result } = renderHook(() => useTasks(defaultProps()));
    await waitFor(() => expect(result.current.tasksLoading).toBe(false));
  });
});

describe('useTasks — filtering', () => {
  it('only returns tasks whose ids are in todaysLog.taskIds', async () => {
    const t1 = mockTask({ id: 'task-1' });
    const t2 = mockTask({ id: 'task-2', title: 'Other task' });
    (getTasks as jest.Mock).mockResolvedValue([t1, t2]);

    const { result } = renderHook(() => useTasks(defaultProps({ taskIds: ['task-1'] })));

    await waitFor(() => expect(result.current.tasksLoading).toBe(false));
    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0].id).toBe('task-1');
  });

  it('returns empty array when todaysLog is null', async () => {
    (getTasks as jest.Mock).mockResolvedValue([mockTask()]);
    const { result } = renderHook(() => useTasks({ todaysLog: null, updateLog: mockUpdateLog }));
    await waitFor(() => expect(result.current.tasksLoading).toBe(false));
    expect(result.current.tasks).toEqual([]);
  });

  it('returns empty array when todaysLog.taskIds is empty', async () => {
    (getTasks as jest.Mock).mockResolvedValue([mockTask()]);
    const { result } = renderHook(() => useTasks(defaultProps({ taskIds: [] })));
    await waitFor(() => expect(result.current.tasksLoading).toBe(false));
    expect(result.current.tasks).toEqual([]);
  });
});

describe('useTasks — addTask', () => {
  it('adds a new task to storage with a generated id', async () => {
    const { result } = renderHook(() => useTasks(defaultProps()));
    await waitFor(() => expect(result.current.tasksLoading).toBe(false));

    await act(async () => {
      await result.current.addTask({
        title: 'New task',
        priority: 'Med',
        time: '30m',
        feeling: 'Calm',
        completed: false,
      });
    });

    const saved = (saveTasks as jest.Mock).mock.calls[0][0] as Task[];
    expect(saved).toHaveLength(1);
    expect(saved[0].title).toBe('New task');
    expect(saved[0].id).toBeTruthy();
  });

  it('appends the new task id to todaysLog.taskIds', async () => {
    const log = mockLog({ taskIds: [] });
    const { result } = renderHook(() => useTasks({ todaysLog: log, updateLog: mockUpdateLog }));
    await waitFor(() => expect(result.current.tasksLoading).toBe(false));

    await act(async () => {
      await result.current.addTask({
        title: 'New task',
        priority: 'Low',
        time: '15m',
        feeling: 'Neutral',
        completed: false,
      });
    });

    expect(mockUpdateLog).toHaveBeenCalledTimes(1);
    const updatedLog: DailyLog = mockUpdateLog.mock.calls[0][0];
    expect(updatedLog.taskIds).toHaveLength(1);
  });

  it('does nothing if todaysLog is null', async () => {
    const { result } = renderHook(() => useTasks({ todaysLog: null, updateLog: mockUpdateLog }));
    await waitFor(() => expect(result.current.tasksLoading).toBe(false));

    await act(async () => {
      await result.current.addTask({
        title: 'New task',
        priority: 'Low',
        time: '15m',
        feeling: 'Neutral',
        completed: false,
      });
    });

    expect(saveTasks).not.toHaveBeenCalled();
    expect(mockUpdateLog).not.toHaveBeenCalled();
  });
});

describe('useTasks — updateTask', () => {
  it('replaces only the matching task', async () => {
    const t1 = mockTask({ id: 'task-1', title: 'Original' });
    const t2 = mockTask({ id: 'task-2', title: 'Other' });
    (getTasks as jest.Mock).mockResolvedValue([t1, t2]);

    const { result } = renderHook(() => useTasks(defaultProps({ taskIds: ['task-1', 'task-2'] })));
    await waitFor(() => expect(result.current.tasksLoading).toBe(false));

    await act(async () => {
      await result.current.updateTask({ ...t1, title: 'Updated' });
    });

    const saved = (saveTasks as jest.Mock).mock.calls[0][0] as Task[];
    expect(saved.find((t) => t.id === 'task-1')?.title).toBe('Updated');
    expect(saved.find((t) => t.id === 'task-2')?.title).toBe('Other');
  });
});

describe('useTasks — deleteTask', () => {
  it('removes the task from storage', async () => {
    const t1 = mockTask({ id: 'task-1' });
    (getTasks as jest.Mock).mockResolvedValue([t1]);

    const { result } = renderHook(() => useTasks(defaultProps({ taskIds: ['task-1'] })));
    await waitFor(() => expect(result.current.tasksLoading).toBe(false));

    await act(async () => {
      await result.current.deleteTask('task-1');
    });

    const saved = (saveTasks as jest.Mock).mock.calls[0][0] as Task[];
    expect(saved).toHaveLength(0);
  });

  it('removes the task id from todaysLog.taskIds', async () => {
    const t1 = mockTask({ id: 'task-1' });
    (getTasks as jest.Mock).mockResolvedValue([t1]);

    const log = mockLog({ taskIds: ['task-1'] });
    const { result } = renderHook(() => useTasks({ todaysLog: log, updateLog: mockUpdateLog }));
    await waitFor(() => expect(result.current.tasksLoading).toBe(false));

    await act(async () => {
      await result.current.deleteTask('task-1');
    });

    const updatedLog: DailyLog = mockUpdateLog.mock.calls[0][0];
    expect(updatedLog.taskIds).not.toContain('task-1');
  });

  it('handles deleting an id that does not exist gracefully', async () => {
    (getTasks as jest.Mock).mockResolvedValue([mockTask({ id: 'task-1' })]);
    const { result } = renderHook(() => useTasks(defaultProps({ taskIds: ['task-1'] })));
    await waitFor(() => expect(result.current.tasksLoading).toBe(false));

    await act(async () => {
      await result.current.deleteTask('nonexistent-id');
    });

    const saved = (saveTasks as jest.Mock).mock.calls[0][0] as Task[];
    expect(saved).toHaveLength(1);
  });
});

describe('useTasks — toggleTask', () => {
  it('flips completed from false to true', async () => {
    const t1 = mockTask({ id: 'task-1', completed: false });
    (getTasks as jest.Mock).mockResolvedValue([t1]);

    const { result } = renderHook(() => useTasks(defaultProps({ taskIds: ['task-1'] })));
    await waitFor(() => expect(result.current.tasksLoading).toBe(false));

    await act(async () => {
      await result.current.toggleTask('task-1');
    });

    const saved = (saveTasks as jest.Mock).mock.calls[0][0] as Task[];
    expect(saved[0].completed).toBe(true);
  });
});
