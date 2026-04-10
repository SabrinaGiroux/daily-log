import { useState } from 'react';
import { Task } from '@/src/types/Task';

type TaskActions = {
  addTask: (fields: Omit<Task, 'id'>) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
};

export function useTaskModal({ addTask, updateTask, deleteTask }: TaskActions) {
  const [sheetVisible, setSheetVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const openNew = () => {
    setEditingTask(null);
    setSheetVisible(true);
  };

  const openEdit = (task: Task) => {
    setEditingTask(task);
    setSheetVisible(true);
  };

  const close = () => setSheetVisible(false);

  const handleSave = async (fields: Omit<Task, 'id'>) => {
    if (editingTask) {
      await updateTask({ ...editingTask, ...fields });
    } else {
      await addTask(fields);
    }
    close();
  };

  const handleDelete = async () => {
    if (!editingTask) return;
    await deleteTask(editingTask.id);
    close();
  };

  return { sheetVisible, editingTask, openNew, openEdit, handleSave, handleDelete, close };
}
