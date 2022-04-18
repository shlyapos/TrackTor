import { StyleSheet } from 'react-native';

import Colors from '../../../../styles/colors';
import Fonts from '../../../../styles/fonts';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: Colors.colorBackgroundTransparentWhite,
  },
  content: {
    ...Fonts.header3,
  },
});

export default styles;
