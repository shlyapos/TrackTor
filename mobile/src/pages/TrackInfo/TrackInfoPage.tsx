import { PureComponent } from 'react';
import {
  ScrollView,
  View,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Text,
} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import MapView from 'react-native-maps';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { IFrontendTrack } from '../../models/tracks';
import TopMenu from '../../components/TopMenu';

import styles from './TrackInfoStyle';

const OS = Platform.OS;
const WindowHeight = Dimensions.get('window').height;
const SliderOpacity = 0.5;
let i = 0;

interface ITrackInfoPageProps extends IFrontendTrack {
  onPress: () => void;
}

export default class TrackInfoPage extends PureComponent<ITrackInfoPageProps> {
  state = {
    scrollEnabled: false,
  };

  render() {
    const { name, region, transport, distance, time, onPress } = this.props;

    return (
      <KeyboardAvoidingView
        enabled={false}
        behavior={OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <TopMenu onPress={onPress} />

        <MapView style={styles.map} />

        <SlidingUpPanel
          ref={(c) => (this._panel = c)}
          draggableRange={{
            top: WindowHeight * 0.8,
            bottom: styles.panelHeader.height + 56,
          }}
          animatedValue={this._draggedValue}
          showBackdrop
          backdropOpacity={SliderOpacity}
          allowDragging
        >
          <View style={styles.panel}>
            <View style={styles.panelHeader}>
              <View style={styles.headerIndicator} />
            </View>

            <ScrollView contentContainerStyle={styles.panelContent}>
              <TextInput
                value={name}
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
              >
                Бежать
              </Button>

              <View style={styles.infoBlock}>
                <Text style={styles.addText}>{transport}</Text>
                <Text style={styles.addText}>{region}</Text>

                <View style={styles.infoBlockAdd}>
                  <Text style={styles.text}>{distance}</Text>
                  <Text style={styles.text}>{time}</Text>
                </View>
              </View>

              <View style={styles.userResult}>
                <Text style={styles.resultText}>Ваше время:</Text>
                <Text style={styles.resultText}>1:30:10</Text>
              </View>

              {/*  */}
            </ScrollView>
          </View>
        </SlidingUpPanel>
      </KeyboardAvoidingView>
    );
  }
}
