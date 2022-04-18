import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { extendTheme, NativeBaseProvider, themeTools, theme as nbTheme } from 'native-base';
import { ApolloProvider } from '@apollo/client';

// App function imports
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import AppExtendedTheme from './constants/Theme'
import Navigation from './navigation';

// Providers
import { AuthProvider } from './context/AuthContext';
import { client } from './apollo/client';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  // Theme
  const config = {
    useSystemColorMode: false,
    initialColorMode: "dark",
  };

  const theme = extendTheme({
    AppExtendedTheme,
    config
  });

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
