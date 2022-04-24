import { StyleSheet } from 'react-native';

import Colors from '../../../../styles/colors';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 28,
    alignSelf: 'center',
    zIndex: 200,
  },
  button: {
    marginBottom: 12,
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
