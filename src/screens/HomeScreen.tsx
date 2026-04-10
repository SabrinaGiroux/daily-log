import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TaskList } from '../components/TaskList';
import { DescriptionArea } from '../components/DescriptionArea';
import { TaskModal } from '../components/TaskModal';
import { useTaskModal } from '../hooks/useTaskModal';
import { useTasks } from '../hooks/useTask';
import { useDailyLogs } from '../hooks/useDailyLog';
import { formatDisplayDate } from '@/src/lib/utils';
import { colors } from '@/src/styles/colors';

export default function HomeScreen() {
  const { todaysLog, loading: logsLoading, updateDescription, updateLog } = useDailyLogs();
  const { tasks, tasksLoading, addTask, updateTask, deleteTask, toggleTask } = useTasks({
    todaysLog,
    updateLog,
  });

  const taskModal = useTaskModal({ addTask, updateTask, deleteTask });

  const loading = tasksLoading || logsLoading;

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.heading}> {todaysLog ? formatDisplayDate(todaysLog.date) : ''}</Text>

        <DescriptionArea value={todaysLog?.description ?? ''} onChange={updateDescription} />

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
    backgroundColor: colors.bg,
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
  heading: {
    fontSize: 28,
    fontWeight: '500',
    color: colors.textPrimary,
    marginBottom: 20,
  },
  taskTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  modalBtn: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.accent,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  modalIcon: {
    color: colors.bg,
    fontSize: 24,
    lineHeight: 26,
  },
});
