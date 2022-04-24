import { StyleSheet } from 'react-native';

import Colors from '../../styles/colors';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  iconContainer: {
    backgroundColor: Colors.colorBackground,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    width: '100%',
    height: 76,
    display: 'flex',
    alignItems: 'center',
    paddingTop: 10,
    marginBottom: 16,
  },
  containerScroll: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  separator: {
    marginBottom: 32,
  },
});

export default styles;
