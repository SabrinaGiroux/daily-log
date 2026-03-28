import { View, ScrollView, Text } from 'react-native';
import { useState } from 'react';
import { styles } from '../styles/taskStyles';
import { TaskItem } from './TaskItem';

const COLUMNS = ['Lvl', 'Time', 'Feeling'];

const tasks = [
  { id: '1', title: 'Play Stardew Valley', priority: 'High', time: '1h', feeling: 'Happy' },
  {
    id: '2',
    title: 'Write report for chem lab',
    priority: 'Med',
    time: '30m',
    feeling: 'Stressed',
  },
];

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

export function TaskList() {
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  /**
   * Removes or adds the id of a task to the completedIds set
   * @param id
   */
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
            onToggle={() => toggle(task.id)}
          />
        ))}
      </View>
    </ScrollView>
  );
}
