import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthNavigator from './src/navigators/AuthNavigator';
import MainNavigator from './src/navigators/MainNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {true ? <AuthNavigator /> : <MainNavigator />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
