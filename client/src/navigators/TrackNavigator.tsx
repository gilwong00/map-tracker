import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TrackList from '../screens/TrackList';
import TrackDetail from '../screens/TrackDetail';

const TrackStackNavigator = createStackNavigator();

const TrackNavigator = () => {
  return (
    <TrackStackNavigator.Navigator
      initialRouteName='TrackList'
      screenOptions={{ headerShown: false }}
    >
      <TrackStackNavigator.Screen name='TrackList' component={TrackList} />
      <TrackStackNavigator.Screen name='TrackDetail' component={TrackDetail} />
    </TrackStackNavigator.Navigator>
  );
};

export default TrackNavigator;
