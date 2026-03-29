import { View, ScrollView, Text, useWindowDimensions } from 'react-native';
import { useMemo } from 'react';
import { makeTaskStyles } from '@/src/styles/taskStyles';
import { TaskItem } from './TaskItem';
import { Task } from '@/src/types/Task';

const COLUMNS = ['Lvl', 'Time', 'Feeling'];

type TaskListProps = {
  tasks: Task[];
  onToggle: (id: string) => void;
  onTaskEdit: (task: Task) => void;
};

export function TaskList({ tasks, onToggle, onTaskEdit }: TaskListProps) {
  const { width } = useWindowDimensions();
  const styles = useMemo(() => makeTaskStyles(width), [width]);

  // Sorts tasks so completed ones are at the bottom
  const sortedTasks = [...tasks].sort((a, b) => Number(a.completed) - Number(b.completed));

  function TableHeader() {
    return (
      <View style={styles.row}>
        <Text style={[styles.titleCell, styles.headerCell]}>Task</Text>
        {COLUMNS.map((col) => (
          <View key={col} style={{ flexDirection: 'row' }}>
            <View style={styles.verticalDivider} />
            <Text style={[styles.cell, styles.headerCell]}>{col}</Text>
          </View>
        ))}
      </View>
    );
  }

  return (
    <ScrollView horizontal>
      <View style={styles.listSection}>
        <TableHeader />
        <View style={styles.divider} />
        {sortedTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            completed={task.completed}
            onLongPress={() => onTaskEdit(task)}
            onToggle={() => onToggle(task.id)}
          />
        ))}
      </View>
    </ScrollView>
  );
}
