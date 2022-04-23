import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TrackInfo from '../pages/TrackInfo';
import TrackRecord from '../pages/TrackRecord';
import TabNavigator from '../components/TabNavigator';
import { RootStackParams } from './types';

const RootStack = createStackNavigator<RootStackParams>();

const RootStackNavigator: React.FC = () => {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name='Home' component={TabNavigator} />
      <RootStack.Screen name='TrackInfo' component={TrackInfo} />
      <RootStack.Screen name='TrackRecord' component={TrackRecord} />
    </RootStack.Navigator>
  );
};

export default RootStackNavigator;
