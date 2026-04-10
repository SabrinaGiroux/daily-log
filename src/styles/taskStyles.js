import { StyleSheet } from 'react-native';
import { colors } from '@/src/styles/colors';

const PADDING = 24 * 2;
const COL_WIDTH = 65;
const NUM_COLS = 3;

export function makeTaskStyles(width) {
  const TABLE_WIDTH = width - PADDING;
  const TITLE_WIDTH = TABLE_WIDTH - COL_WIDTH * NUM_COLS;

  return StyleSheet.create({
    row: {
      flexDirection: 'row',
      paddingVertical: 10,
      alignItems: 'center',
    },
    titleCell: {
      fontSize: 13,
      color: colors.textPrimary,
      paddingHorizontal: 8,
      width: TITLE_WIDTH,
    },
    cell: {
      width: COL_WIDTH,
      fontSize: 13,
      color: '#7A6A5A',
      paddingHorizontal: 4,
      textAlign: 'center',
    },
    verticalDivider: {
      width: StyleSheet.hairlineWidth,
      alignSelf: 'stretch',
      backgroundColor: colors.border,
    },
    headerCell: {
      fontWeight: '500',
      color: colors.textMuted,
      fontSize: 11,
      textTransform: 'uppercase',
      letterSpacing: 0.8,
      paddingHorizontal: 4,
      textAlign: 'center',
    },
    divider: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: colors.border,
    },
    listSection: {
      flex: 1,
      width: TABLE_WIDTH,
      backgroundColor: colors.surface,
      borderRadius: 12,
      borderWidth: 0.5,
      borderColor: colors.border,
      overflow: 'hidden',
      paddingHorizontal: 4,
    },
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
}
