import { StyleSheet } from 'react-native';

import Colors from '../../../../styles/colors';
import Fonts from '../../../../styles/fonts';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.colorAccent,
    borderRadius: 12,
    width: '100%',
    paddingTop: 20,
    paddingLeft: 22,
    paddingRight: 22,
    paddingBottom: 20,
    display: 'flex',
  },
  title: {
    color: Colors.colorBackgroundTransparentBlack,
    textAlign: 'center',
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: 34,
    marginBottom: 12,
  },
  input: {
    backgroundColor: Colors.colorAccent,

    height: 40,
    marginBottom: 8,
    ...{ ...Fonts.text, color: Colors.colorBackground }, // TODO: meh :(
  },
  inputPlaceholder: {
    color: Colors.colorPlaceholderBlack,
  },
  inputOutLine: {
    color: Colors.colorBackgroundTransparentBlack,
  },
  inputSelection: {
    color: Colors.colorBackground,
  },
  button: {
    alignSelf: 'center',
    marginTop: 8,
    width: 160,
  },
  buttonContent: {
    backgroundColor: Colors.colorBackground,
    height: 36,
  },
  buttonLabel: {
    color: Colors.colorWhiteText,
  },
});

export default styles;
