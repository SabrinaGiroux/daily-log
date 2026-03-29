import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TaskList } from '../components/TaskList';
import { DescriptionArea } from '../components/DescriptionArea';
import { TaskModal } from '../components/TaskModal';
import { useState } from 'react';

type Task = {
  id: string;
  title: string;
  priority: string;
  time: string;
  feeling: string;
};

const TASKS = [
  { id: '1', title: 'Play Stardew Valley', priority: 'High', time: '1h', feeling: 'Happy' },
  {
    id: '2',
    title: 'Write report for chem lab',
    priority: 'Med',
    time: '30m',
    feeling: 'Stressed',
  },
];

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>(TASKS);

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

  const handleSave = (fields: Omit<Task, 'id'>) => {
    if (editingTask) {
      // Update existing
      setTasks((prev) => prev.map((t) => (t.id === editingTask.id ? { ...t, ...fields } : t)));
    } else {
      // Create new
      const newTask: Task = { id: Date.now().toString(), ...fields };
      setTasks((prev) => [...prev, newTask]);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.heading}>{'Mon, March 23 2026'}</Text>

      <DescriptionArea />

      <View>
        <Text style={styles.taskTitle}>Tasks</Text>
        <TaskList tasks={tasks} onTaskEdit={openEdit} />
      </View>

      <TouchableOpacity style={styles.modalBtn} onPress={openNew}>
        <Text style={styles.modalIcon}>+</Text>
      </TouchableOpacity>

      <TaskModal
        visible={sheetVisible}
        initial={editingTask}
        onSave={handleSave}
        onClose={() => setSheetVisible(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 24,
    paddingBottom: 48,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  date: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  heading: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 32,
  },
  taskTitle: {
    fontSize: 26,
  },
  modalBtn: {
    position: 'absolute',
    bottom: 16,
    right: 0,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  modalIcon: {
    color: '#fff',
    fontSize: 24,
    lineHeight: 26,
  },
});
