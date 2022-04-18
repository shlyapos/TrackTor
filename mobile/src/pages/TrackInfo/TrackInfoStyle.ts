import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { StyleSheet } from 'react-native';

import Colors from '../../styles/colors';
import Fonts from '../../styles/fonts';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.colorBackground,
    paddingTop: Platform.OS === 'ios' ? Constants.statusBarHeight : 0,
    width: '100%',
    height: '100%',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  mapPolylineColor: {
    color: '#FF5555',
  },
  panel: {
    backgroundColor: Colors.colorBackground,
    position: 'relative',
    borderRadius: 12,
    height: '100%',
  },
  panelHeader: {
    alignItems: 'center',
    backgroundColor: Colors.colorBackground,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    height: 36,
    justifyContent: 'center',
  },
  headerIndicator: {
    width: 80,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.colorBackgroundTransparentWhite,
  },
  panelContent: {
    backgroundColor: Colors.colorBackground,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    // height: '100%',
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'column',
  },
  buttonContent: {
    backgroundColor: Colors.colorAccent,
    height: 36,
  },
  buttonLabel: {
    color: Colors.colorBackground,
  },
  input: {
    backgroundColor: Colors.colorBackground,
    width: '100%',
    height: 40,
    marginBottom: 20,
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
  infoBlock: {
    width: '100%',
    marginTop: 16,
  },
  addText: {
    ...Fonts.addText,
    marginBottom: 4,
  },
  infoBlockAdd: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 24,
    justifyContent: 'space-between',
  },
  text: {
    ...Fonts.text,
  },
  userResult: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  resultText: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 24,
    lineHeight: 24,
    letterSpacing: 0.15,
    color: Colors.colorWhiteText,
  },
  scoreTable: {
    width: '100%',
    alignItems: 'center',
  },
  scoreScrollPadding: {
    height: 20,
  },
});

export default styles;
