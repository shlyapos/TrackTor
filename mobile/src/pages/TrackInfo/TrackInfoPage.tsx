import { PureComponent, Fragment } from 'react';
import {
  ScrollView,
  View,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Text,
  GestureResponderEvent,
} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import MapView from 'react-native-maps';
import SlidingUpPanel from 'rn-sliding-up-panel';
import TopMenu from '../../components/TopMenu';

import styles from './TrackInfoStyle';

const OS = Platform.OS;
const WindowHeight = Dimensions.get('window').height;
const SliderOpacity = 0.5;
let i = 0;

interface ITrackInfoPageProps {
  name: string;
}

export default class TrackInfoPage extends PureComponent<ITrackInfoPageProps> {
  state = {
    scrollEnabled: false,
  };

  render() {
    return (
      <KeyboardAvoidingView
        enabled={false}
        behavior={OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <TopMenu />

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
                value='Прогулка по лесу, на этом маршруте можно увидеть речку, крутое дерево'
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
                <Text style={styles.addText}>Москва</Text>
                <Text style={styles.addText}>Пеший</Text>

                <View style={styles.infoBlockAdd}>
                  <Text style={styles.text}>500 м</Text>
                  <Text style={styles.text}>~ 1:30</Text>
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
