import { StyleSheet, Platform } from 'react-native';
import Constants from 'expo-constants';

import Colors from '../../styles/colors';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.colorBackground,
    display: 'flex',
    paddingTop: Platform.OS === 'ios' ? Constants.statusBarHeight : 0,
    width: '100%',
    height: '100%',
  },
  list: {
    width: '100%',
  },
});

export default styles;
