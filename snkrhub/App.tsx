import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {  NativeBaseProvider } from 'native-base';
import { ApolloProvider } from '@apollo/client';

// App function imports
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import theme  from './constants/Theme'
import Navigation from './navigation';

// Providers
import { AuthProvider } from './context/AuthContext';
import { client } from './apollo/client';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NativeBaseProvider theme={theme}>
        <SafeAreaProvider>
          <AuthProvider>
            <ApolloProvider client={client}>
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
            </ApolloProvider>
          </AuthProvider>
        </SafeAreaProvider>
      </NativeBaseProvider>
    );
  }
}
