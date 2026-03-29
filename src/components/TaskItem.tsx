import { Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { makeTaskStyles } from '../styles/taskStyles';
import { useMemo } from 'react';

type Task = {
  id: string;
  title: string;
  priority: string;
  time: string;
  feeling: string;
};

type TaskItemProps = {
  task: Task;
  completed: boolean;
  onToggle: () => void;
  onLongPress: () => void;
};

export function TaskItem({ task, completed, onToggle, onLongPress }: TaskItemProps) {
  const { width } = useWindowDimensions();
  const styles = useMemo(() => makeTaskStyles(width), [width]);

  const textStyle = completed ? { textDecorationLine: 'line-through' as const, color: '#aaa' } : {};

  return (
    <TouchableOpacity style={styles.row} onPress={onToggle} onLongPress={onLongPress}>
      <Text style={[styles.titleCell, textStyle]} numberOfLines={1} ellipsizeMode="tail">
        {task.title}
      </Text>

      <View style={styles.verticalDivider} />
      <Text style={[styles.cell, textStyle]}>{task.priority}</Text>

      <View style={styles.verticalDivider} />
      <Text style={[styles.cell, textStyle]}>{task.time}</Text>

      <View style={styles.verticalDivider} />
      <Text style={[styles.cell, textStyle]}>{task.feeling}</Text>
    </TouchableOpacity>
  );
}
