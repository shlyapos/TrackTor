import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/Login';
import TrackInfo from '../pages/TrackInfo';
import TrackRecord from '../pages/TrackRecord';
import TabNavigator from '../components/TabNavigator';
import { RootStackParams } from './types';

const RootStack = createStackNavigator<RootStackParams>();

const RootStackNavigator: React.FC = () => {
  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={'Login'}
    >
      <RootStack.Screen name='Home' component={TabNavigator} />
      <RootStack.Screen name='Login' component={Login} />
      <RootStack.Screen name='TrackInfo' component={TrackInfo} />
      <RootStack.Screen name='TrackRecord' component={TrackRecord} />
    </RootStack.Navigator>
  );
};

export default RootStackNavigator;
