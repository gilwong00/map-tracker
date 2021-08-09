import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';
import AuthProvider from './src/context';
import Home from './src/screens/Home';

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

  return (
    // this does add some additional padding bottom to the tab navigator
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <NavigationContainer>
              <Home />
            </NavigationContainer>
          </SafeAreaView>
        </AuthProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
