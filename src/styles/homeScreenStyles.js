import { StyleSheet } from 'react-native';
import { colors } from '@/src/styles/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
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
  heading: {
    fontSize: 28,
    fontWeight: '500',
    color: colors.textPrimary,
    marginBottom: 20,
  },
  taskTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  modalBtn: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.accent,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  modalIcon: {
    color: colors.bg,
    fontSize: 24,
    lineHeight: 26,
  },
});
