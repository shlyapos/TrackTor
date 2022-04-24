import { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { IActionButtonsProps } from '../ActionButtons';

import styles from './TrackRunStopStyle';

interface ITrackRunStopProps extends IActionButtonsProps {
  isFinished?: boolean;
}

export default class TrackRunStop extends PureComponent<ITrackRunStopProps> {
  render() {
    const { isFinished, onPressSave, onPressContinue, onPressNotSave } =
      this.props;

    return (
      <>
        <View style={styles.container}>
          {isFinished ? (
            <Text style={styles.text}>Дистанция полностью пройдена</Text>
          ) : (
            <Text style={styles.text}>Дистанция не пройдена</Text>
          )}

          <View style={styles.buttonContainer}>
            {isFinished ? (
              <Button
                style={styles.button}
                contentStyle={styles.buttonContent}
                labelStyle={styles.buttonLabel}
                mode='contained'
                onPress={onPressSave}
              >
                сохранить
              </Button>
            ) : (
              <>
                <Button
                  style={styles.button}
                  contentStyle={styles.buttonContent}
                  labelStyle={styles.buttonLabel}
                  mode='contained'
                  onPress={onPressContinue}
                >
                  продолжить
                </Button>
                <Button
                  style={styles.button}
                  contentStyle={styles.buttonContent}
                  labelStyle={styles.buttonLabel}
                  mode='contained'
                  onPress={onPressNotSave}
                >
                  отменить запись
                </Button>
              </>
            )}
          </View>
        </View>
      </>
    );
  }
}
