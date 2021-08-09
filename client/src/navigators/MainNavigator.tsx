import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Account from '../screens/Account';
import TrackCreate from '../screens/TrackCreate';
import TrackNavigator from './TrackNavigator';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName='Tracks'
      // tabBarOptions={{
      //   activeTintColor: '#e91e63',
      //   inactiveBackgroundColor: '#e99c63',
      //   activeBackgroundColor: 'rgb(200, 100, 100)'
      // }}
    >
      <Tab.Screen
        name='Track'
        component={TrackNavigator}
        options={{
          tabBarLabel: 'Home'
        }}
      />
      <Tab.Screen
        name='Create'
        component={TrackCreate}
        options={{
          tabBarLabel: 'Create'
        }}
      />
      <Tab.Screen
        name='Account'
        component={Account}
        options={{
          tabBarLabel: 'Account'
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
