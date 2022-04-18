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
import MapView, { Marker, Polyline } from 'react-native-maps';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { IFrontendTrack } from '../../models/tracks';
import TopMenu from '../../components/TopMenu';
import ScoreTableItem from './components/ScoreTableItem';

import styles from './TrackInfoStyle';

const OS = Platform.OS;
const WindowHeight = Dimensions.get('window').height;
const SliderOpacity = 0.5;

interface ITrackInfoPageProps extends IFrontendTrack {
  onPress: () => void;
  onStart: () => void;
}

export default class TrackInfoPage extends PureComponent<ITrackInfoPageProps> {
  state = {
    scrollEnabled: false,
  };

  render() {
    const {
      name,
      region,
      transport,
      distance,
      time,
      coords,
      onPress,
      onStart,
    } = this.props;

    return (
      <KeyboardAvoidingView
        enabled={false}
        behavior={OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <TopMenu onPress={onPress} />

        <MapView
          initialRegion={{
            latitude: coords![0].lat,
            longitude: coords![0].lon,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={styles.map}
        >
          {coords?.map(({ lat, lon }) => (
            <Marker
              coordinate={{
                latitude: lat,
                longitude: lon,
              }}
            />
          ))}
          <Polyline
            coordinates={coords?.map(({ lat, lon }) => ({
              latitude: lat,
              longitude: lon,
            }))}
            strokeWidth={3}
            strokeColor={styles.mapPolylineColor.color}
            lineCap={'round'}
          />
        </MapView>

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
                onPress={onStart}
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

              <View style={styles.scoreTable}>
                <Text style={styles.resultText}>Список лидеров</Text>
                {/* TODO: вставка элементов таблицы либо из стора, либо из state */}
                {/* TODO: надо бы убрать этот View :/ */}
                <View style={styles.scoreScrollPadding} />{' '}
              </View>
            </ScrollView>
          </View>
        </SlidingUpPanel>
      </KeyboardAvoidingView>
    );
  }
}
