import { StyleSheet, TextInput } from 'react-native';

type Props = {
  value: string;
  onChange: (text: string) => void;
};

export function DescriptionArea({ value, onChange }: Props) {
  return (
    <TextInput
      style={styles.description}
      value={value}
      onChangeText={onChange}
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
