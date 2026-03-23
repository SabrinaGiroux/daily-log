import { StyleSheet } from 'react-native';

export const COL_WIDTH = 90;

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
  },
  titleCell: {
    flex: 1,
    fontSize: 15,
    color: '#1a1a1a',
    paddingHorizontal: 8,
  },
  cell: {
    width: COL_WIDTH,
    fontSize: 15,
    color: '#1a1a1a',
    paddingHorizontal: 8,
    textAlign: 'center',
  },
  verticalDivider: {
    width: StyleSheet.hairlineWidth,
    alignSelf: 'stretch',
    backgroundColor: '#ddd',
  },
  headerCell: {
    width: COL_WIDTH,
    fontWeight: '700',
    color: '#555',
    fontSize: 13,
    textTransform: 'uppercase',
    paddingHorizontal: 8,
    textAlign: 'center',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ddd',
  },
});
