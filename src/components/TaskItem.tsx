import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles/taskStyles';

type Task = {
  id: string;
  title: string;
  priority: string;
  time: string;
  feeling: string;
};

export function TaskItem({ task }: { task: Task }) {
  return (
    <TouchableOpacity
      style={styles.row}
      onPress={() => console.log('short press')}
      onLongPress={() => console.log('long press')}
    >
      <Text style={styles.titleCell} numberOfLines={1} ellipsizeMode="tail">
        {task.title}
      </Text>

      <View style={styles.verticalDivider} />
      <Text style={styles.cell}>{task.priority}</Text>

      <View style={styles.verticalDivider} />
      <Text style={styles.cell}>{task.time}</Text>

      <View style={styles.verticalDivider} />
      <Text style={styles.cell}>{task.feeling}</Text>
    </TouchableOpacity>
  );
}
