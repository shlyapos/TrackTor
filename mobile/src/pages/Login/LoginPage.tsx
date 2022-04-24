import { PureComponent } from 'react';
import {
  View,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import backgroundImage from '../../assets/background.png';
import ActionBlock from './components/ActionBlock';
import MainIcon from './components/MainIcon';

import styles from './LoginPageStyle';

interface ILoginPageProps {
  loginSignIn: string;
  passwordSignIn: string;
  loginSignUp: string;
  passwordSignUp: string;
  onChangeLoginSignIn: (value: string) => void;
  onChangePasswordSignIn: (value: string) => void;
  onPressSignIn: () => void;
  onChangeLoginSignUp: (value: string) => void;
  onChangePasswordSignUp: (value: string) => void;
  onPressSignUp: () => void;
}

const OS = Platform.OS;

export default class LoginPage extends PureComponent<ILoginPageProps> {
  render() {
    const {
      loginSignIn,
      passwordSignIn,
      loginSignUp,
      passwordSignUp,
      onChangeLoginSignIn,
      onChangePasswordSignIn,
      onPressSignIn,
      onChangeLoginSignUp,
      onChangePasswordSignUp,
      onPressSignUp,
    } = this.props;
    return (
      <KeyboardAvoidingView
        enabled={false}
        behavior={OS === 'ios' ? 'padding' : 'height'}
        // style={styles.container}
      >
        <ImageBackground source={backgroundImage} style={styles.container}>
          <View style={styles.iconContainer}>
            <MainIcon />
          </View>

          <ScrollView contentContainerStyle={styles.containerScroll}>
            <ActionBlock
              title='Войти'
              valueLogin={loginSignIn}
              valuePassword={passwordSignIn}
              onChangeLogin={onChangeLoginSignIn}
              onChangePassword={onChangePasswordSignIn}
              onPress={onPressSignIn}
            />

            <View style={styles.separator}></View>

            <ActionBlock
              title='Регистрация'
              valueLogin={loginSignUp}
              valuePassword={passwordSignUp}
              onChangeLogin={onChangeLoginSignUp}
              onChangePassword={onChangePasswordSignUp}
              onPress={onPressSignUp}
            />
          </ScrollView>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}
