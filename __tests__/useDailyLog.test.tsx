import { renderHook, act, waitFor } from '@testing-library/react-native';
import { useDailyLogs } from '@/src/hooks/useDailyLog';
import { getDailyLogs, saveDailyLogs } from '@/src/lib/storage';
import { DailyLog } from '@/src/types/DailyLog';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('@/src/lib/storage', () => ({
  getDailyLogs: jest.fn(),
  saveDailyLogs: jest.fn(),
}));

const TODAY = '2026-04-09';

const mockLog = (overrides?: Partial<DailyLog>): DailyLog => ({
  id: 'log-1',
  date: TODAY,
  description: '',
  taskIds: [],
  ...overrides,
});

beforeEach(() => {
  jest.clearAllMocks();
  jest.useFakeTimers().setSystemTime(new Date('2026-04-09'));
  (getDailyLogs as jest.Mock).mockResolvedValue([]);
  (saveDailyLogs as jest.Mock).mockResolvedValue(undefined);
});

afterEach(() => {
  jest.useRealTimers();
});

describe('useDailyLogs — loading', () => {
  it('starts with loading true', () => {
    (getDailyLogs as jest.Mock).mockReturnValue(new Promise(() => {}));
    const { result } = renderHook(() => useDailyLogs());
    expect(result.current.loading).toBe(true);
  });

  it('sets loading to false after logs load', async () => {
    const { result } = renderHook(() => useDailyLogs());
    await waitFor(() => expect(result.current.loading).toBe(false));
  });
});

describe('useDailyLogs — auto-create today', () => {
  it('creates a log for today if none exists', async () => {
    (getDailyLogs as jest.Mock).mockResolvedValue([]);
    const { result } = renderHook(() => useDailyLogs());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.todaysLog).not.toBeNull();
    expect(result.current.todaysLog?.date).toBe(TODAY);
  });

  it('persists the newly created log to storage', async () => {
    (getDailyLogs as jest.Mock).mockResolvedValue([]);
    renderHook(() => useDailyLogs());
    await waitFor(() => expect(saveDailyLogs as jest.Mock).toHaveBeenCalled());

    const saved = (saveDailyLogs as jest.Mock).mock.calls[0][0] as DailyLog[];
    expect(saved).toHaveLength(1);
    expect(saved[0].date).toBe(TODAY);
  });

  it('does not create a duplicate if today log already exists', async () => {
    (getDailyLogs as jest.Mock).mockResolvedValue([mockLog()]);
    renderHook(() => useDailyLogs());

    await waitFor(() => expect(getDailyLogs as jest.Mock).toHaveBeenCalled());

    expect(saveDailyLogs).not.toHaveBeenCalled();
  });

  it('sets todaysLog to the existing log if already present', async () => {
    const existing = mockLog({ description: 'Already here' });
    (getDailyLogs as jest.Mock).mockResolvedValue([existing]);

    const { result } = renderHook(() => useDailyLogs());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.todaysLog?.description).toBe('Already here');
  });

  it('handles first install with empty storage', async () => {
    (getDailyLogs as jest.Mock).mockResolvedValue([]);
    const { result } = renderHook(() => useDailyLogs());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.logs).toHaveLength(1);
    expect(result.current.todaysLog).not.toBeNull();
  });
});

describe('useDailyLogs — updateDescription', () => {
  it('updates the description on todaysLog', async () => {
    (getDailyLogs as jest.Mock).mockResolvedValue([mockLog()]);
    const { result } = renderHook(() => useDailyLogs());
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.updateDescription('A great day');
    });

    const saved = (saveDailyLogs as jest.Mock).mock.calls[0][0] as DailyLog[];
    expect(saved[0].description).toBe('A great day');
  });
});

describe('useDailyLogs — updateLog', () => {
  it('replaces only the matching log', async () => {
    const log1 = mockLog({ id: 'log-1', date: TODAY });
    const log2 = mockLog({ id: 'log-2', date: '2026-04-08' });
    (getDailyLogs as jest.Mock).mockResolvedValue([log1, log2]);

    const { result } = renderHook(() => useDailyLogs());
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.updateLog({ ...log1, description: 'Updated' });
    });

    const saved = (saveDailyLogs as jest.Mock).mock.calls[0][0] as DailyLog[];
    expect(saved.find((l) => l.id === 'log-1')?.description).toBe('Updated');
    expect(saved.find((l) => l.id === 'log-2')?.description).toBe('');
  });
});

describe('useDailyLogs — moveTask', () => {
  it('removes taskId from source log and adds to target log', async () => {
    const log1 = mockLog({ id: 'log-1', date: TODAY, taskIds: ['task-1'] });
    const log2 = mockLog({ id: 'log-2', date: '2026-04-08', taskIds: [] });
    (getDailyLogs as jest.Mock).mockResolvedValue([log1, log2]);

    const { result } = renderHook(() => useDailyLogs());
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.moveTask('task-1', 'log-1', 'log-2');
    });

    const saved = (saveDailyLogs as jest.Mock).mock.calls[0][0] as DailyLog[];
    expect(saved.find((l) => l.id === 'log-1')?.taskIds).not.toContain('task-1');
    expect(saved.find((l) => l.id === 'log-2')?.taskIds).toContain('task-1');
  });

  it('handles moving a taskId that does not exist in source log', async () => {
    const log1 = mockLog({ id: 'log-1', taskIds: [] });
    const log2 = mockLog({ id: 'log-2', date: '2026-04-08', taskIds: [] });
    (getDailyLogs as jest.Mock).mockResolvedValue([log1, log2]);

    const { result } = renderHook(() => useDailyLogs());
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.moveTask('nonexistent', 'log-1', 'log-2');
    });

    const saved = (saveDailyLogs as jest.Mock).mock.calls[0][0] as DailyLog[];
    expect(saved.find((l) => l.id === 'log-2')?.taskIds).toContain('nonexistent');
  });

  it('when fromLogId and toLogId are the same, nothing changes', async () => {
    const log1 = mockLog({ id: 'log-1', taskIds: ['task-1'] });
    (getDailyLogs as jest.Mock).mockResolvedValue([log1]);

    const { result } = renderHook(() => useDailyLogs());
    await waitFor(() => expect(result.current.loading).toBe(false));

    (saveDailyLogs as jest.Mock).mockClear();

    await act(async () => {
      await result.current.moveTask('task-1', 'log-1', 'log-1');
    });

    expect(saveDailyLogs).not.toHaveBeenCalled();
  });
});
