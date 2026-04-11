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
    fontSize: 30,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 24,
  },

  taskTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 14,
  },
  modalBtn: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.accent,
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  modalIcon: {
    color: colors.bg,
    fontSize: 24,
    lineHeight: 26,
  },
  description: {
    padding: 16,
    marginBottom: 28,
    borderRadius: 16,
    backgroundColor: colors.surfaceAlt,
    color: colors.textPrimary,
    fontSize: 15,
    lineHeight: 20,
    borderColor: colors.border,
    borderWidth: 1,
    shadowColor: colors.accent,
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
});
