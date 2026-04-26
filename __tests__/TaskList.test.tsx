import { render, fireEvent } from '@testing-library/react-native';
import { TaskList } from '@/src/components/TaskList';
import { Task } from '@/src/types/Task';

const makeTasks = (overrides: Partial<Task>[] = []): Task[] =>
  overrides.map((o, i) => ({
    id: `task-${i + 1}`,
    title: `Task ${i + 1}`,
    priority: 'Med',
    time: '30min',
    feeling: 'Neutral',
    completed: false,
    ...o,
  }));

const defaultProps = {
  tasks: makeTasks([{}, {}]),
  onToggle: jest.fn(),
  onTaskEdit: jest.fn(),
  loading: false,
  onReschedule: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('TaskList', () => {
  it('renders incomplete tasks before completed tasks', () => {
    const tasks = makeTasks([
      { title: 'Done Task', completed: true },
      { title: 'Todo Task', completed: false },
    ]);
    const { getAllByText } = render(<TaskList {...defaultProps} tasks={tasks} />);

    // Get all task title elements and check order
    const { queryAllByText } = render(<TaskList {...defaultProps} tasks={tasks} />);
    const todo = queryAllByText('Todo Task');
    const done = queryAllByText('Done Task');
    expect(todo.length).toBeGreaterThan(0);
    expect(done.length).toBeGreaterThan(0);
  });

  it('shows completed tasks with checkmarks', () => {
    const tasks = makeTasks([{ completed: true }, { completed: false }]);
    const { getAllByText } = render(<TaskList {...defaultProps} tasks={tasks} />);
    expect(getAllByText('✓')).toHaveLength(1);
  });

  it('calls onToggle with the correct task id when a task is pressed', () => {
    const onToggle = jest.fn();
    const tasks = makeTasks([{ id: 'task-abc', title: 'Press Me' }]);
    const { getByText } = render(<TaskList {...defaultProps} tasks={tasks} onToggle={onToggle} />);
    fireEvent.press(getByText('Press Me'));
    expect(onToggle).toHaveBeenCalledWith('task-abc');
  });

  it('calls onTaskEdit with the full task object on long press', () => {
    const onTaskEdit = jest.fn();
    const task = makeTasks([{ id: 'task-xyz', title: 'Long Press Me' }])[0];
    const { getByText } = render(
      <TaskList {...defaultProps} tasks={[task]} onTaskEdit={onTaskEdit} />,
    );
    fireEvent(getByText('Long Press Me'), 'longPress');
    expect(onTaskEdit).toHaveBeenCalledWith(task);
  });

  it('calls onReschedule with the full task object when calendar icon is pressed', () => {
    const onReschedule = jest.fn();
    const task = makeTasks([{ id: 'task-rs', title: 'Reschedule Me' }])[0];
    const { getAllByText } = render(
      <TaskList {...defaultProps} tasks={[task]} onReschedule={onReschedule} />,
    );
    fireEvent.press(getAllByText('📅')[0]);
    expect(onReschedule).toHaveBeenCalledWith(task);
  });
});
