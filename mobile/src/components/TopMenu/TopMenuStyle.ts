import { StyleSheet } from 'react-native';

import Colors from '../../styles/colors';
import Fonts from '../../styles/fonts';

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.colorBackgroundTransparentWhite,
    width: '100%',
    height: 56,
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 16,
  },
  search: {
    backgroundColor: Colors.colorBackground,
    elevation: 0,
    shadowOpacity: 0,
  },
  searchInput: {
    color: Colors.colorWhiteText,
  },
  searchPlaceholder: {
    color: Colors.colorPlaceholderWhite,
  },
  searchSelection: {
    color: Colors.colorAccent,
  },
  searchIcon: {
    color: Colors.colorWhiteText,
  },
  buttonContent: {
    height: 40,
  },
  buttonLabel: {
    ...Fonts.text,
  },
});

export default styles;
