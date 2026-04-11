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
    fontSize: 24,
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

export const modalStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  modalWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  modal: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingBottom: 40,
    gap: 6,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ccc',
    alignSelf: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 10,
    marginBottom: 4,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: colors.textPrimary,
    backgroundColor: colors.surfaceAlt,
  },
  chipRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    backgroundColor: 'transparent',
  },
  chipActive: {
    backgroundColor: colors.accent, // dark blue accent
    borderColor: colors.accent,
  },
  chipText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  chipTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 20,
  },
  saveBtn: {
    backgroundColor: colors.accent, // dark blue
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveBtnDisabled: {
    backgroundColor: '#ccc',
  },
  saveBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  deleteBtn: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#f00',
    alignItems: 'center',
  },
  deleteBtnText: {
    color: '#f00',
    fontWeight: '600',
    fontSize: 15,
  },
});
