import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthNavigator from './src/navigators/AuthNavigator';
import MainNavigator from './src/navigators/MainNavigator';
import AuthProvider, { AuthContext } from './src/context';

export default function App() {
  const { authenticated } = useContext(AuthContext);

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          {!authenticated ? <AuthNavigator /> : <MainNavigator />}
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
