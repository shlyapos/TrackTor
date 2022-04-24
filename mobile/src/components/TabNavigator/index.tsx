import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Login from '../../pages/Login';
import TrackList from '../../pages/TrackList';
import TrackCreate from '../../pages/TrackCreate';

import styles from './TabNavigatorStyle';

const Tab = createMaterialBottomTabNavigator();

const TabNavigator: React.FC = () => {
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
        component={Login}
        options={{ tabBarIcon: 'logout', title: 'Выйти' }}
      />
      <Tab.Screen
        name='TrackList'
        component={TrackList}
        options={{ tabBarIcon: 'format-list-text', title: 'Список треков' }}
      />
      <Tab.Screen
        name='TrackCreate'
        component={TrackCreate}
        options={{ tabBarIcon: 'pencil-outline', title: 'Создание' }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
