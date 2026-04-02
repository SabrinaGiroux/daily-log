import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TaskList } from '../components/TaskList';
import { DescriptionArea } from '../components/DescriptionArea';
import { TaskModal } from '../components/TaskModal';
import { useTaskModal } from '../hooks/useTaskModal';
import { useTasks } from '../hooks/useTask';

export default function HomeScreen() {
  const { tasks, loading, addTask, updateTask, deleteTask, toggleTask } = useTasks();
  const taskModal = useTaskModal({ addTask, updateTask, deleteTask });

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.heading}>{'Mon, March 29 2026'}</Text>

        <DescriptionArea />

        <View>
          <Text style={styles.taskTitle}>Tasks</Text>
          <TaskList
            tasks={tasks}
            onTaskEdit={taskModal.openEdit}
            onToggle={toggleTask}
            loading={loading}
          />
        </View>
      </ScrollView>

      {/* Create Task Button*/}
      <TouchableOpacity style={styles.modalBtn} onPress={taskModal.openNew}>
        <Text style={styles.modalIcon}>+</Text>
      </TouchableOpacity>

      {/* Task Modal (Create/Edit)*/}
      <TaskModal
        visible={taskModal.sheetVisible}
        initial={taskModal.editingTask}
        onSave={taskModal.handleSave}
        onDelete={taskModal.editingTask ? taskModal.handleDelete : undefined}
        onClose={taskModal.close}
      />
    </View>
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
    right: 16,
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
