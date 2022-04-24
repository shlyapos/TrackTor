import { StyleSheet, Platform } from 'react-native';
import Constants from 'expo-constants';

import Colors from '../../../../styles/colors';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: Colors.colorAccent,
    borderRadius: 12,
    elevation: 8,
    width: 174,
    height: 76,
    position: 'absolute',
    top: Platform.OS === 'ios' ? Constants.statusBarHeight + 12 : 12,
    zIndex: 100,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 16,
    paddingRight: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  time: {
    color: Colors.colorBackgroundTransparentBlack,
    textAlign: 'center',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 24,
    letterSpacing: 0.15,
    marginBottom: 4,
  },
  distance: {
    color: Colors.colorBackgroundTransparentBlack,
    fontWeight: '100',
    textAlign: 'center',
    fontSize: 22,
    lineHeight: 24,
    letterSpacing: 0.15,
  },
});

export default styles;
