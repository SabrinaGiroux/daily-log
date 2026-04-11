import { StyleSheet } from 'react-native';
import { colors } from '@/src/styles/colors';

const PADDING = 24 * 2;
const COL_WIDTH = 65;
const NUM_COLS = 3;

export function makeTaskStyles(width) {
  const TABLE_WIDTH = width - PADDING;
  const TITLE_WIDTH = TABLE_WIDTH - COL_WIDTH * NUM_COLS;

  return StyleSheet.create({
    listSection: {
      width: TABLE_WIDTH,
      backgroundColor: colors.surface,
      borderRadius: 16,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: '#000',
      shadowOpacity: 0.04,
      shadowRadius: 10,
      elevation: 2,
    },

    row: {
      flexDirection: 'row',
      paddingVertical: 14,
      paddingHorizontal: 8,
      alignItems: 'center',
    },

    titleCell: {
      width: TITLE_WIDTH,
      fontSize: 14,
      color: colors.textPrimary,
    },

    cell: {
      width: COL_WIDTH,
      fontSize: 13,
      color: colors.textSecondary,
      textAlign: 'center',
    },

    headerCell: {
      fontSize: 11,
      color: colors.textMuted,
      textTransform: 'uppercase',
      letterSpacing: 1,
      textAlign: 'center',
    },

    divider: {
      height: 1,
      backgroundColor: colors.divider,
      marginHorizontal: 8,
    },

    verticalDivider: {
      width: 1,
      backgroundColor: colors.divider,
      marginVertical: 6,
    },
    checkboxContainer: {
      width: 32,
      alignItems: 'center',
      justifyContent: 'center',
    },

    checkboxBox: {
      width: 18,
      height: 18,
      borderRadius: 4,
      borderWidth: 2,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },

    checkboxChecked: {
      backgroundColor: colors.accent,
      borderColor: colors.textPrimary,
    },

    checkmark: {
      color: '#fff',
      fontSize: 12,
      fontWeight: '600',
    },
  });
}
