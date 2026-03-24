import { StyleSheet } from 'react-native';
import { useWindowDimensions } from 'react-native';

const { width } = useWindowDimensions();

const PADDING = 24 * 2;
const TABLE_WIDTH = width - PADDING;
const COL_WIDTH = 65; // priority, time, feeling
const NUM_COLS = 3;
const TITLE_WIDTH = TABLE_WIDTH - COL_WIDTH * NUM_COLS;

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    fontSize: 11,
  },
  titleCell: {
    fontSize: 13,
    color: '#1a1a1a',
    paddingHorizontal: 4,
    width: TITLE_WIDTH,
  },
  cell: {
    width: COL_WIDTH,
    fontSize: 13,
    color: '#1a1a1a',
    paddingHorizontal: 4,
    textAlign: 'center',
  },
  verticalDivider: {
    width: StyleSheet.hairlineWidth,
    alignSelf: 'stretch',
    backgroundColor: '#ddd',
  },
  headerCell: {
    fontWeight: '700',
    color: '#555',
    fontSize: 13,
    textTransform: 'uppercase',
    paddingHorizontal: 4,
    textAlign: 'center',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ddd',
  },

  listSection: {
    flex: 1,
    width: TABLE_WIDTH,
  },
});
