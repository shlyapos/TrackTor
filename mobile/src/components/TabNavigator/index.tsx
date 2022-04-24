import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Middleware } from '../../pages/Login/middleware';
import { LoginScreenNavigationProp } from '../../stack';
import TrackList from '../../pages/TrackList';
import TrackCreate from '../../pages/TrackCreate';

import styles from './TabNavigatorStyle';

interface ITabNavigatorProps {
  navigation: LoginScreenNavigationProp;
}

const Tab = createMaterialBottomTabNavigator();

const TabNavigator: React.FC<ITabNavigatorProps> = ({ navigation }) => {
  return (
    <Tab.Navigator
      activeColor={styles.navigation.color}
      barStyle={styles.navigation}
      backBehavior='initialRoute'
      inactiveColor={styles.navInactive.color}
      initialRouteName='TrackList'
    >
      <Tab.Screen
        name='Login'
        options={{ tabBarIcon: 'logout', title: 'Выйти' }}
      >
        {() => <Middleware navigation={navigation} />}
      </Tab.Screen>
      <Tab.Screen
        name='TrackList'
        options={{ tabBarIcon: 'format-list-text', title: 'Список треков' }}
      >
        {() => <TrackList />}
      </Tab.Screen>
      <Tab.Screen
        name='TrackCreate'
        component={TrackCreate}
        options={{ tabBarIcon: 'pencil-outline', title: 'Создание' }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
