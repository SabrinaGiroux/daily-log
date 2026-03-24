import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { TaskList } from '../components/TaskList';
import { DescriptionArea } from '../components/DescriptionArea';

export default function HomeScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.heading}>{'Mon, March 23 2026'}</Text>

      <DescriptionArea />

      <View>
        <Text style={styles.taskTitle}>Tasks</Text>
        <TaskList />
      </View>
    </ScrollView>
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
});
