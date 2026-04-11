import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { TaskList } from '../components/TaskList';
import { DescriptionArea } from '../components/DescriptionArea';
import { TaskModal } from '../components/TaskModal';
import { useTaskModal } from '../hooks/useTaskModal';
import { useTasks } from '../hooks/useTask';
import { useDailyLogs } from '../hooks/useDailyLog';
import { formatDisplayDate } from '@/src/lib/utils';
import { styles } from '@/src/styles/homeScreenStyles';
import { RescheduleModal } from '../components/RescheduleModal';
import { Task } from '@/src/types/Task';
import { useState } from 'react';

export default function HomeScreen() {
  const {
    todaysLog,
    loading: logsLoading,
    updateDescription,
    updateLog,
    rescheduleTask,
  } = useDailyLogs();
  const { tasks, tasksLoading, addTask, updateTask, deleteTask, toggleTask } = useTasks({
    todaysLog,
    updateLog,
  });

  const taskModal = useTaskModal({ addTask, updateTask, deleteTask });

  const [reschedulingTask, setReschedulingTask] = useState<Task | null>(null);

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
            onReschedule={setReschedulingTask}
          />
          <RescheduleModal
            visible={!!reschedulingTask}
            taskTitle={reschedulingTask?.title ?? ''}
            onReschedule={(date) => {
              if (reschedulingTask && todaysLog) {
                rescheduleTask(reschedulingTask.id, todaysLog.id, date);
              }
            }}
            onClose={() => setReschedulingTask(null)}
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
