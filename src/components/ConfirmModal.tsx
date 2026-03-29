import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

type ConfirmModalProps = {
  message: string;
  actionLabel?: string;
  onAction: () => void;
  onClose: () => void;
};

export function ConfirmModal({
  message,
  actionLabel = 'Confirm',
  onAction,
  onClose,
}: ConfirmModalProps) {
  return (
    <View style={styles.confirmRow}>
      <Text style={styles.confirmText}>{message}</Text>
      <TouchableOpacity style={styles.deleteBtn} onPress={onAction}>
        <Text style={styles.deleteBtnText}>{actionLabel}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onClose}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  confirmRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  confirmText: {
    fontSize: 13,
    color: '#888',
    flex: 1,
  },
  cancelText: {
    fontSize: 14,
    color: '#888',
    paddingHorizontal: 8,
  },
  deleteBtn: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#f00',
  },
  deleteBtnText: {
    color: '#f00',
    fontWeight: '600',
    fontSize: 15,
  },
});
