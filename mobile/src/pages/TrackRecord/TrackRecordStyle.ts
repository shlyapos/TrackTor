import { StyleSheet, Platform, Dimensions } from 'react-native';
import Constants from 'expo-constants';

const WindowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: WindowHeight - 42,
    paddingTop: Platform.OS === 'ios' ? Constants.statusBarHeight : 0,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default styles;
