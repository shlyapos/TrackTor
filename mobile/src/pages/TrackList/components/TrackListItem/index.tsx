import { PureComponent } from 'react';
import { TouchableHighlight, Text, View } from 'react-native';
import { IFrontendTrack } from '../../../../models/tracks';

import Fonts from './../../../../styles/fonts';
import styles from './TrackListItemStyle';

interface TrackListItemProps extends IFrontendTrack {
  onPress: (id: string) => void;
}

export default class TrackListItem extends PureComponent<TrackListItemProps> {
  render() {
    const { id, name, region, transport, distance, time, onPress } = this.props;

    return (
      <TouchableHighlight
        onPress={() => onPress(id)}
        underlayColor={styles.touchableContainer.color}
      >
        <View style={styles.container}>
          <Text numberOfLines={1} style={[Fonts.header3, styles.header]}>
            {name}
          </Text>
          <Text style={[Fonts.addText, styles.region]}>{region}</Text>
          <Text style={Fonts.addText}>{transport}</Text>

          <View style={styles.addInfo}>
            <Text style={Fonts.text}>{distance}</Text>
            <Text style={Fonts.text}>{time}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
