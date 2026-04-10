import { TextInput } from 'react-native';
import { styles } from '@/src/styles/homeScreenStyles';

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
