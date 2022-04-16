import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TrackInfo from '../pages/TrackInfo';
import TabNavigator from '../components/TabNavigator';
import { RootStackParams } from './types';

const RootStack = createStackNavigator<RootStackParams>();

const RootStackNavigator: React.FC = () => {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name='Home' component={TabNavigator} />
      <RootStack.Screen name='TrackInfo' component={TrackInfo} />
    </RootStack.Navigator>
  );
};

export default RootStackNavigator;
