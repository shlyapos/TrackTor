import * as React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootStackNavigator from './stack/RootStackNavigator';

import styles from './AppStyle';

const AppPage = () => {
  return (
    <NavigationContainer
      theme={{
        colors: {
          background: styles.navigation.backgroundColor,
        },
      }}
    >
      <StatusBar backgroundColor={styles.statusBar.backgroundColor} />
      <RootStackNavigator />
    </NavigationContainer>
  );
};

export default AppPage;
