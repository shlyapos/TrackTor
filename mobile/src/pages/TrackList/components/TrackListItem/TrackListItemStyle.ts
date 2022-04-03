import { StyleSheet } from 'react-native';
import Colors from './../../../../styles/colors';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 136,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 16,
    paddingRight: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.colorBackgroundTransparentWhite,
  },
  header: {
    marginBottom: 8,
    height: 20,
  },
  region: {
    marginBottom: 4,
  },
  addInfo: {
    marginTop: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default styles;
