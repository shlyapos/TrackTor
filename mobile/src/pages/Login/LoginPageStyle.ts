import { StyleSheet, Platform } from 'react-native';
import Constants from 'expo-constants';

import Colors from '../../styles/colors';

const OSpaddingTop = Platform.OS === 'ios' ? Constants.statusBarHeight : 0;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingTop: OSpaddingTop,
  },
  containerImage: {
    marginTop: OSpaddingTop,
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
