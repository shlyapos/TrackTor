import { PureComponent } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

import styles from './ActionButtonsStyles';

export interface IActionButtonsProps {
  onPressSave: () => void;
  onPressContinue: () => void;
  onPressNotSave: () => void;
}

export default class ActionButtons extends PureComponent<IActionButtonsProps> {
  render() {
    const { onPressSave, onPressContinue, onPressNotSave } = this.props;

    return (
      <View style={styles.container}>
        <Button
          style={styles.button}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
          mode='contained'
          onPress={onPressSave}
        >
          сохранить
        </Button>
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
          не сохранять
        </Button>
      </View>
    );
  }
}
