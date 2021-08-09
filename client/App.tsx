import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { SafeAreaView, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';
import AuthNavigator from './src/navigators/AuthNavigator';
import MainNavigator from './src/navigators/MainNavigator';
import AuthProvider, { AuthContext } from './src/context';

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 60 * 1000 * 5
      },
      mutations: {
        onError: (e: Error) => {
          if ('message' in e) {
            Alert.alert('ERROR', e.message);
          }
        }
      }
    }
  });
  const { authenticated } = useContext(AuthContext);

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <NavigationContainer>
              {!authenticated ? <AuthNavigator /> : <MainNavigator />}
            </NavigationContainer>
          </SafeAreaView>
        </AuthProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
