import { StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';

export function DescriptionArea() {
  const [description, setDescription] = useState('');

  return (
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
  );
}

const styles = StyleSheet.create({
  description: {
    padding: 5,
    marginBottom: 32,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    height: 100,
  },
});
