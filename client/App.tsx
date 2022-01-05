import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import DrawerNavigation from './navigation/DrawerNavigation';
import LoginScreen from './screens/LoginScreen';

const isLoggedIn = true;

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <StatusBar />
        {!isLoggedIn ? <LoginScreen colorScheme={colorScheme} /> : <DrawerNavigation colorScheme={colorScheme} />}
      </SafeAreaProvider>
    );
  }
}
