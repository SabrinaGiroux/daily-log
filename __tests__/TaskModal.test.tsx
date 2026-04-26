import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TaskModal } from '@/src/components/TaskModal';
import { Task } from '@/src/types/Task';

const defaultProps = {
  visible: true,
  initial: null,
  onSave: jest.fn(),
  onDelete: jest.fn(),
  onClose: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('TaskModal', () => {
  it('renders "New Task" title when no initial task', () => {
    const { getByText } = render(<TaskModal {...defaultProps} />);
    expect(getByText('New Task')).toBeTruthy();
  });

  it('renders "Edit Task" title when an initial task is provided', () => {
    const task: Task = {
      id: 'task-1',
      title: 'Existing task',
      priority: 'High',
      time: '1h',
      feeling: 'Tired',
      completed: false,
    };
    const { getByText } = render(<TaskModal {...defaultProps} initial={task} />);
    expect(getByText('Edit Task')).toBeTruthy();
  });

  it('renders priority options', () => {
    const { getByText } = render(<TaskModal {...defaultProps} />);
    expect(getByText('Low')).toBeTruthy();
    expect(getByText('Med')).toBeTruthy();
    expect(getByText('High')).toBeTruthy();
  });

  it('renders feeling options', () => {
    const { getByText } = render(<TaskModal {...defaultProps} />);
    expect(getByText('Happy')).toBeTruthy();
    expect(getByText('Neutral')).toBeTruthy();
    expect(getByText('Stressed')).toBeTruthy();
    expect(getByText('Tired')).toBeTruthy();
  });

  it('does not render Delete button when onDelete is not provided', () => {
    const { queryByText } = render(<TaskModal {...defaultProps} onDelete={undefined} />);
    expect(queryByText('Delete')).toBeNull();
  });

  it('renders Delete button when onDelete is provided', () => {
    const { getByText } = render(<TaskModal {...defaultProps} onDelete={jest.fn()} />);
    expect(getByText('Delete')).toBeTruthy();
  });

  it('does not render when visible is false', () => {
    const { queryByText } = render(<TaskModal {...defaultProps} visible={false} />);
    expect(queryByText('New Task')).toBeNull();
  });

  it('starts with empty title when no initial task', () => {
    const { getByPlaceholderText } = render(<TaskModal {...defaultProps} initial={null} />);
    expect(getByPlaceholderText('What do you need to do?')).toBeTruthy();
  });

  it('shows a confirmation prompt when Delete is pressed', () => {
    const { getByText } = render(<TaskModal {...defaultProps} />);
    fireEvent.press(getByText('Delete'));
    expect(getByText(/are you sure/i)).toBeTruthy();
  });

  it('calls onDelete when deletion is confirmed', () => {
    const onDelete = jest.fn();
    const { getByText } = render(<TaskModal {...defaultProps} onDelete={onDelete} />);
    fireEvent.press(getByText('Delete'));
    fireEvent.press(getByText('Delete Task'));
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it('does not call onDelete if confirmation is cancelled', () => {
    const onDelete = jest.fn();
    const { getByText } = render(<TaskModal {...defaultProps} onDelete={onDelete} />);
    fireEvent.press(getByText('Delete'));
    // Close the confirm modal without confirming
    fireEvent.press(getByText(/cancel/i));
    expect(onDelete).not.toHaveBeenCalled();
  });

  it('calls onSave with correct fields when Save is pressed', () => {
    const onSave = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <TaskModal {...defaultProps} onSave={onSave} />,
    );
    fireEvent.changeText(getByPlaceholderText('What do you need to do?'), 'New task title');
    fireEvent.press(getByText('Save'));
    expect(onSave).toHaveBeenCalledWith({
      title: 'New task title',
      priority: 'Med',
      time: '30min',
      feeling: 'Neutral',
      completed: false,
    });
  });

  it('does not call onSave when title is empty', () => {
    const onSave = jest.fn();
    const { getByText } = render(<TaskModal {...defaultProps} onSave={onSave} />);
    fireEvent.press(getByText('Save'));
    expect(onSave).not.toHaveBeenCalled();
  });

  it('trims whitespace from the title before saving', () => {
    const onSave = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <TaskModal {...defaultProps} onSave={onSave} />,
    );
    fireEvent.changeText(getByPlaceholderText('What do you need to do?'), '  Trimmed  ');
    fireEvent.press(getByText('Save'));
    expect(onSave).toHaveBeenCalledWith(expect.objectContaining({ title: 'Trimmed' }));
  });

  it('calls onClose after saving', () => {
    const onClose = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <TaskModal {...defaultProps} onClose={onClose} />,
    );
    fireEvent.changeText(getByPlaceholderText('What do you need to do?'), 'Something');
    fireEvent.press(getByText('Save'));
    expect(onClose).toHaveBeenCalled();
  });

  it('saves with selected priority when changed', () => {
    const onSave = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <TaskModal {...defaultProps} onSave={onSave} />,
    );
    fireEvent.changeText(getByPlaceholderText('What do you need to do?'), 'Priority test');
    fireEvent.press(getByText('High'));
    fireEvent.press(getByText('Save'));
    expect(onSave).toHaveBeenCalledWith(expect.objectContaining({ priority: 'High' }));
  });

  it('saves with selected feeling when changed', () => {
    const onSave = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <TaskModal {...defaultProps} onSave={onSave} />,
    );
    fireEvent.changeText(getByPlaceholderText('What do you need to do?'), 'Feeling test');
    fireEvent.press(getByText('Tired'));
    fireEvent.press(getByText('Save'));
    expect(onSave).toHaveBeenCalledWith(expect.objectContaining({ feeling: 'Tired' }));
  });
});
