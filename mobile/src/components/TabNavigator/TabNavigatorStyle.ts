import { StyleSheet } from 'react-native';

import Colors from '../../styles/colors';

const styles = StyleSheet.create({
  navigation: {
    backgroundColor: Colors.colorAccent,
    color: Colors.colorBackground,
  },
  navInactive: {
    color: Colors.colorBackgroundTransparentBlack,
  },
});

export default styles;
