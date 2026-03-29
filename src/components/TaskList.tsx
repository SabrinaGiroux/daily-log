import { View, ScrollView, Text, useWindowDimensions } from 'react-native';
import { useState, useMemo } from 'react';
import { makeTaskStyles } from '../styles/taskStyles';
import { TaskItem } from './TaskItem';

const COLUMNS = ['Lvl', 'Time', 'Feeling'];

type Task = {
  id: string;
  title: string;
  priority: string;
  time: string;
  feeling: string;
};

type TaskListProps = {
  tasks: Task[];
  onTaskEdit: (task: Task) => void;
};

export function TaskList({ tasks, onTaskEdit }: TaskListProps) {
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  const { width } = useWindowDimensions();
  const styles = useMemo(() => makeTaskStyles(width), [width]);

  // Removes or adds the id of a task to the completedIds set
  const toggle = (id: string) => {
    setCompletedIds((prev) => {
      const next = new Set(prev);
      // eslint-disable-next-line no-unused-expressions
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // Sorts tasks so completed ones are at the bottom
  const sortedTasks = [...tasks].sort((a, b) => {
    const aDone = completedIds.has(a.id) ? 1 : 0;
    const bDone = completedIds.has(b.id) ? 1 : 0;
    return aDone - bDone;
  });

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
            completed={completedIds.has(task.id)}
            onLongPress={() => onTaskEdit(task)}
            onToggle={() => toggle(task.id)}
          />
        ))}
      </View>
    </ScrollView>
  );
}
