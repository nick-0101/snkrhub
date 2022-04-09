import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { extendTheme, NativeBaseProvider, theme as nbTheme } from 'native-base';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  // Theme
  const config = {
    useSystemColorMode: false,
    initialColorMode: "dark",
  };

  const theme = extendTheme({
    colors: {
      primary: nbTheme.colors.blue,
    },
    components: {
      Button: {
        defaultProps: {
          borderRadius: '6',
          py: '3',
        },
      },
      Input: {
        defaultProps: {
          borderRadius: '5',
          px: '3.5',
          py: '3',
          borderWidth: 1.2
        },
      },
    },
    config
  });

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NativeBaseProvider theme={theme}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </NativeBaseProvider>
    );
  }
}
