import React from 'react';
import LoginPage from './LoginPage';
import { LoginScreenNavigationProp } from '../../stack';

interface ILoginPageProps {
  navigation: LoginScreenNavigationProp;
}

const Login: React.FC<ILoginPageProps> = ({ navigation }) => {
  const [loginSignIn, setLoginSignIn] = React.useState('');
  const [passwordSignIn, setPasswordSignIn] = React.useState('');

  const [loginSignUp, setLoginSignUp] = React.useState('');
  const [passwordSignUp, setPasswordSignUp] = React.useState('');

  const onChangeLoginSignIn = (value: string) => setLoginSignIn(value);
  const onChangePasswordSignIn = (value: string) => setPasswordSignIn(value);
  const onPressSignIn = () => {
    navigation.navigate('Home');
  };

  const onChangeLoginSignUp = (value: string) => setLoginSignUp(value);
  const onChangePasswordSignUp = (value: string) => setPasswordSignUp(value);
  const onPressSignUp = () => {
    navigation.navigate('Home');
  };

  return (
    <LoginPage
      loginSignIn={loginSignIn}
      passwordSignIn={passwordSignIn}
      loginSignUp={loginSignUp}
      passwordSignUp={passwordSignUp}
      onChangeLoginSignIn={onChangeLoginSignIn}
      onChangePasswordSignIn={onChangePasswordSignIn}
      onPressSignIn={onPressSignIn}
      onChangeLoginSignUp={onChangeLoginSignUp}
      onChangePasswordSignUp={onChangePasswordSignUp}
      onPressSignUp={onPressSignUp}
    />
  );
};

export default Login;
