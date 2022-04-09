import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { extendTheme, NativeBaseProvider, themeTools, theme as nbTheme } from 'native-base';

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
        baseStyle: (props: any) => {
          return {
            // light: any, dark: any
            borderColor: themeTools.mode("gray.300", "gray.800")(props),
            background: themeTools.mode("gray.800", "#262A31")(props),
          };
        },
        defaultProps: {
          borderRadius: '5',
          px: '3.5',
          py: '3',
          borderWidth: 1.2,
          fontSize: "sm",
          fontWeight: 'medium'
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
