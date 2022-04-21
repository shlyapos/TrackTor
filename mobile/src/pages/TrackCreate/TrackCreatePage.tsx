import { PureComponent } from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import TopMenu from '../../components/TopMenu';
import { Transport } from '../../models/tracks';
import { StyleSheet } from 'react-native';

import styles from './TrackCreateStyle';

interface ITrackCreatePageProps {
  name: string;
  transport: string | Transport;
  onChangeName: (value: string) => void;
  onChangeTransport: (value: string) => void;
  onPressStart: () => void;
}

export default class TrackCreatePage extends PureComponent<ITrackCreatePageProps> {
  render() {
    const { transport, name, onChangeName, onChangeTransport, onPressStart } =
      this.props;

    return (
      <View style={styles.container}>
        <TextInput
          value={name}
          onChangeText={onChangeName}
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
        {/* TODO: заменить TextInput на Select для выбора транспорта */}
        <TextInput
          value={transport}
          onChangeText={onChangeTransport}
          autoComplete={'off'}
          placeholder='Транспорт'
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
    );
  }
}
