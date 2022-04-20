import { PureComponent } from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import TopMenu from '../../components/TopMenu';
import { Transport } from '../../models/tracks';
import { StyleSheet } from 'react-native';

import styles from './TrackCreateStyle';

interface ITrackCreatePageProps {
  transports: Transport[];
  onPressBack: () => void;
  onChangeName: (value: string) => void;
  onChangeTransport: (value: Transport) => void;
  onPressStart: () => void;
}

export default class TrackCreatePage extends PureComponent<ITrackCreatePageProps> {
  render() {
    const { onChangeName, onPressStart } = this.props;

    return (
      <View style={styles.container}>
        <TopMenu onPress={() => {}} />

        <View style={styles.inputContainer}>
          <TextInput
            onChange={() => onChangeName}
            autoComplete={'off'}
            placeholder='Название'
            mode={'outlined'}
            style={styles.input}
            outlineColor={styles.inputOutLine.color}
            activeOutlineColor={styles.inputOutLine.color}
            placeholderTextColor={styles.inputPlaceholder.color}
            selectionColor={styles.inputSelection.color}
            theme={{ colors: { text: styles.input.color } }}
          />
          <Button
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
            mode='contained'
            onPress={onPressStart}
            theme={{ colors: { background: styles.buttonLabel.color } }}
          >
            старт
          </Button>
        </View>
      </View>
    );
  }
}
