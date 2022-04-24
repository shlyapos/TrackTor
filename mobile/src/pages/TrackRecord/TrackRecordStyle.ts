import { StyleSheet, Platform, Dimensions } from 'react-native';
import Constants from 'expo-constants';

import Colors from '../../styles/colors';
import Fonts from '../../styles/fonts';

const WindowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingTop: Platform.OS === 'ios' ? Constants.statusBarHeight : 0,
  },
  loadText: {
    position: 'absolute',
    top: WindowHeight / 2 - 56,
    alignSelf: 'center',
    ...Fonts.addText,
  },
  fab: {
    position: 'absolute',
    bottom: 28,
    right: 28,
    backgroundColor: Colors.colorAccent,
    zIndex: 100,
  },
  loadAnimate: {
    color: Colors.colorAccent,
    position: 'absolute',
    top: WindowHeight / 2,
    alignSelf: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  mapPolylineColor: {
    color: Colors.colorAccent,
  },
  mapMarkerCheckpoint: {
    color: Colors.colorAccent,
  },
  mapMarkerEnd: {
    color: '#FF5555',
  },
});

export default styles;
