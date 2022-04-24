import { StyleSheet, Dimensions } from 'react-native';

import Colors from '../../../../styles/colors';
import Fonts from '../../../../styles/fonts';

const WindowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: WindowHeight / 2,
    paddingBottom: 28,
  },
  buttonContainer: {
    paddingLeft: 90,
    paddingRight: 90,
  },
  text: {
    width: 192,
    height: 96,
    alignSelf: 'center',
    textAlign: 'center',
    ...Fonts.header3,
  },
  button: {
    marginBottom: 16,
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
