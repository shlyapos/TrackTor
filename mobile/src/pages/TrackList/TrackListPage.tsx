import { PureComponent } from 'react';
import { View, Text } from 'react-native';

import styles from './TrackListStyle';

export default class TrackListPage extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Text>TrackListPage</Text>
      </View>
    );
  }
}
