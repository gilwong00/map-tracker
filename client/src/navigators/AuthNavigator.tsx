import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Signup from '../screens/Signup';
import Signin from '../screens/Signin';
import MainNavigator from './MainNavigator';

const AuthStackNavigator = createStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator
      initialRouteName='Signup'
      screenOptions={{ headerShown: false }}
    >
      <AuthStackNavigator.Screen name='Signup' component={Signup} />
      <AuthStackNavigator.Screen name='Signin' component={Signin} />
      <AuthStackNavigator.Screen name='Main' component={MainNavigator} />
    </AuthStackNavigator.Navigator>
  );
};

export default AuthNavigator;
