import { PureComponent } from 'react';
import { View, Text } from 'react-native';

import styles from './TrackCreateStyle';

export default class TrackCreatePage extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Text>TrackCreatePage</Text>
      </View>
    );
  }
}
