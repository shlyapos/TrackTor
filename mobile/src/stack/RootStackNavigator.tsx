import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TrackList from '../pages/TrackList';
import TrackInfo from '../pages/TrackInfo';
import { RootStackParams } from './types';

const RootStack = createStackNavigator<RootStackParams>();

const RootStackNavigator: React.FC = () => {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name='TrackList' component={TrackList} />
      <RootStack.Screen name='TrackInfo' component={TrackInfo} />
    </RootStack.Navigator>
  );
};

export default RootStackNavigator;
