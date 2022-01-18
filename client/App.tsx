import 'expo-dev-client';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Alert from './components/Alert';
import AuthTokenContext from './context/AuthTokenContext';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import DrawerNavigation from './navigation/DrawerNavigation';
import LoginScreen from './screens/LoginScreen';

export default function App() {
  const [authToken, setAuthToken] = useState('');
  const [isOpenAlert, setIsOpenAlert] = useState(false);

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
          {!authToken ? (
            <LoginScreen colorScheme={colorScheme} />
          ) : (
            <DrawerNavigation colorScheme={colorScheme} openLogoutConfirm={() => setIsOpenAlert(true)} />
          )}
        </AuthTokenContext.Provider>
        <Alert
          isOpen={isOpenAlert}
          title="ログアウト"
          message="ログアウトしますね"
          onClose={async () => {
            await AsyncStorage.removeItem('authToken');
            setAuthToken('');
            setIsOpenAlert(false);
          }}
        />
      </SafeAreaProvider>
    );
  }
}
