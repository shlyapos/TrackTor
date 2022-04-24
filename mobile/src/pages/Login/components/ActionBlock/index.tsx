import { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

import styles from './ActionBlockStyle';

interface IActionBlockProps {
  title: string;
  valueLogin: string;
  valuePassword: string;
  onPress: () => void;
  onChangeLogin: (value: string) => void;
  onChangePassword: (value: string) => void;
}

export default class ActionBlock extends PureComponent<IActionBlockProps> {
  render() {
    const {
      title,
      valueLogin,
      valuePassword,
      onPress,
      onChangeLogin,
      onChangePassword,
    } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>

        <TextInput
          value={valueLogin}
          placeholder='Логин'
          autoComplete={'off'}
          mode='outlined'
          style={styles.input}
          outlineColor={styles.inputOutLine.color}
          activeOutlineColor={styles.inputOutLine.color}
          placeholderTextColor={styles.inputPlaceholder.color}
          selectionColor={styles.inputSelection.color}
          onChangeText={onChangeLogin}
        />

        <TextInput
          value={valuePassword}
          placeholder='Пароль'
          autoComplete={'off'}
          mode='outlined'
          style={styles.input}
          outlineColor={styles.inputOutLine.color}
          activeOutlineColor={styles.inputOutLine.color}
          placeholderTextColor={styles.inputPlaceholder.color}
          selectionColor={styles.inputSelection.color}
          onChangeText={onChangePassword}
        />

        <Button
          mode='contained'
          onPress={onPress}
          style={styles.button}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
        >
          подтвердить
        </Button>
      </View>
    );
  }
}
