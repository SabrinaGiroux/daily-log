import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { TaskList } from '../components/TaskList';

export default function HomeScreen() {
  const [description, setDescription] = useState('');

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      {/* Header */}
      <Text style={styles.heading}>{'Mon, March 23 2026'}</Text>

      {/* Description*/}
      <TextInput
        style={styles.description}
        value={description}
        onChangeText={(text) => setDescription(text)}
        placeholder="Describe your day here"
        placeholderTextColor="#aaa"
        multiline
        numberOfLines={4}
        textAlignVertical="top"
      />

      {/* Daily tasks */}
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
  description: {
    padding: 5,
    marginBottom: 32,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
  },
});
