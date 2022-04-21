import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { StyleSheet } from 'react-native';

import Colors from '../../styles/colors';
import Fonts from '../../styles/fonts';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.colorBackground,
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? Constants.statusBarHeight : 0,
    paddingLeft: 20,
    paddingRight: 20,
  },
  input: {
    backgroundColor: Colors.colorBackground,
    width: '100%',
    height: 40,
    marginBottom: 16,
    ...Fonts.text,
  },
  inputPlaceholder: {
    color: Colors.colorPlaceholderWhite,
  },
  inputOutLine: {
    color: Colors.colorBackgroundTransparentWhite,
  },
  inputSelection: {
    color: Colors.colorAccent,
  },
  buttonContent: {
    backgroundColor: Colors.colorAccent,
    height: 36,
  },
  buttonLabel: {
    color: Colors.colorBackground,
  },
});

export default styles;
