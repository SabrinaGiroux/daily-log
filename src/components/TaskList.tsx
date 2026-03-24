import { View, ScrollView, Text } from 'react-native';
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
  return (
    <ScrollView horizontal>
      <View style={styles.listSection}>
        <TableHeader />
        <View style={styles.divider} />
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </View>
    </ScrollView>
  );
}
