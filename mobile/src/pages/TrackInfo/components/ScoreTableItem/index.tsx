import { PureComponent } from 'react';
import { View, Text } from 'react-native';

import styles from './ScoreTableItemStyle';

interface IScoreTableItemProp {
  login: string;
  time: string;
}

export default class ScoreTableItem extends PureComponent<IScoreTableItemProp> {
  render() {
    const { login, time } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.content}>{login}</Text>
        <Text style={styles.content}>{time}</Text>
      </View>
    );
  }
}
