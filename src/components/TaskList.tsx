import { View, ScrollView, Text } from 'react-native';
import { styles } from '../styles/taskStyles';
import { TaskItem } from './TaskItem';

const COLUMNS = ['Task', 'Priority', 'Time', 'Feeling'];

const tasks = [
  { id: '1', title: 'Play Stardew Valley', priority: 'High', time: '1h', feeling: 'Happy' },
  { id: '2', title: 'Send report', priority: 'Medium', time: '30m', feeling: 'Stressed' },
];

function TableHeader() {
  return (
    <View style={styles.row}>
      {COLUMNS.map((col) => (
        <>
          <Text key={col} style={[styles.cell, styles.headerCell]}>
            {col}
          </Text>

          <View style={styles.verticalDivider} />
        </>
      ))}
    </View>
  );
}

export function TaskList() {
  return (
    <ScrollView horizontal>
      <View>
        <TableHeader />
        <View style={styles.divider} />
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </View>
    </ScrollView>
  );
}
