import React from 'react';
import { LoginScreenNavigationProp } from '../../stack';

interface IMiddlewareProps {
  navigation: LoginScreenNavigationProp;
}

export const Middleware: React.FC<IMiddlewareProps> = ({ navigation }) => {
  React.useEffect(() => {
    navigation.navigate('Login');
    console.log('Jopa');
  }, []);

  return null;
};
