import { PureComponent } from 'react';
import { Text, View } from 'react-native';

import styles from './TrackListItemStyle';
import Fonts from './../../../../styles/fonts';

interface TrackListItemProps {
  name: string;
  region: string;
  transport: string;
  length: string;
  time: string;
}

export default class TrackListItem extends PureComponent<TrackListItemProps> {
  render() {
    const { name, region, transport, length, time } = this.props;

    return (
      <View style={styles.container}>
        <Text numberOfLines={1} style={[Fonts.header3, styles.header]}>
          {name}
        </Text>
        <Text style={[Fonts.addText, styles.region]}>{region}</Text>
        <Text style={Fonts.addText}>{transport}</Text>

        <View style={styles.addInfo}>
          <Text style={Fonts.text}>{length}</Text>
          <Text style={Fonts.text}>{time}</Text>
        </View>
      </View>
    );
  }
}
