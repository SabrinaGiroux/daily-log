import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export function TaskItem() {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => console.log('short press')}
      onLongPress={() => console.log('Long press!')}
    >
      <Text style={styles.title}>This is a task!</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#888',
  },
  checked: {
    backgroundColor: '#888',
  },
  title: {
    flex: 1,
    fontSize: 16,
    color: '#1a1a1a',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
  input: {
    flex: 1,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#888',
    paddingVertical: 2,
  },
});
