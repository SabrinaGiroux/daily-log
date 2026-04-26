import { render, fireEvent } from '@testing-library/react-native';
import { TaskItem } from '@/src/components/TaskItem';

const mockTask = {
  id: 'task-1',
  title: 'Write unit tests',
  priority: 'High',
  time: '1h',
  feeling: 'Neutral',
};

const defaultProps = {
  task: mockTask,
  completed: false,
  onToggle: jest.fn(),
  onLongPress: jest.fn(),
  onReschedule: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
});
describe('TaskItem', () => {
  it('calls onToggle when the row is pressed', () => {
    const onToggle = jest.fn();
    const { getByText } = render(<TaskItem {...defaultProps} onToggle={onToggle} />);
    fireEvent.press(getByText('Write unit tests'));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('calls onLongPress when the row is long pressed', () => {
    const onLongPress = jest.fn();
    const { getByText } = render(<TaskItem {...defaultProps} onLongPress={onLongPress} />);
    fireEvent(getByText('Write unit tests'), 'longPress');
    expect(onLongPress).toHaveBeenCalledTimes(1);
  });

  it('calls onReschedule when the calendar button is pressed', () => {
    const onReschedule = jest.fn();
    const { getByText } = render(<TaskItem {...defaultProps} onReschedule={onReschedule} />);
    fireEvent.press(getByText('📅'));
    expect(onReschedule).toHaveBeenCalledTimes(1);
  });

  it('calls onToggle when the checkbox is pressed', () => {
    const onToggle = jest.fn();
    const { getByText } = render(
      <TaskItem {...defaultProps} completed={true} onToggle={onToggle} />,
    );
    fireEvent.press(getByText('✓'));
    expect(onToggle).toHaveBeenCalled();
  });

  it('applies strikethrough style to title when completed', () => {
    const { getByText } = render(<TaskItem {...defaultProps} completed={true} />);
    const titleEl = getByText('Write unit tests');
    const flatStyle = Array.isArray(titleEl.props.style)
      ? Object.assign({}, ...titleEl.props.style)
      : titleEl.props.style;
    expect(flatStyle.textDecorationLine).toBe('line-through');
  });

  it('does not apply strikethrough when not completed', () => {
    const { getByText } = render(<TaskItem {...defaultProps} completed={false} />);
    const titleEl = getByText('Write unit tests');
    const flatStyle = Array.isArray(titleEl.props.style)
      ? Object.assign({}, ...titleEl.props.style.filter(Boolean))
      : (titleEl.props.style ?? {});
    expect(flatStyle.textDecorationLine).toBeUndefined();
  });
});
