import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, { createContext, useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import DrawerNavigation from './navigation/DrawerNavigation';
import LoginScreen from './screens/LoginScreen';

export const AuthTokenContext = createContext<{
  authToken: string;
  setAuthToken: React.Dispatch<React.SetStateAction<string>>;
}>({
  authToken: '',
  setAuthToken: () => {
    return;
  }
});

export default function App() {
  const [authToken, setAuthToken] = useState('');

  useEffect(() => {
    (async () => setAuthToken((await AsyncStorage.getItem('authToken')) || ''))();
  }, []);

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <StatusBar />
        <AuthTokenContext.Provider value={{ authToken, setAuthToken }}>
          {!authToken ? <LoginScreen colorScheme={colorScheme} /> : <DrawerNavigation colorScheme={colorScheme} />}
        </AuthTokenContext.Provider>
      </SafeAreaProvider>
    );
  }
}
