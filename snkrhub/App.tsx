import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { extendTheme, NativeBaseProvider, themeTools, theme as nbTheme } from 'native-base';

// App function imports
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { AuthProvider } from './context/AuthContext';

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
          py: '4',
          borderWidth: 1.2,
          fontSize: "sm",
          fontWeight: 'medium'
        },
      },
      FormControl: {
        baseStyle: (props: any) => {
          return {
            background: themeTools.mode("gray.800", "#262A31")(props),
          };
        },
        defaultProps: {
          borderRadius: '5',
        },
      },
    },
    config
  });


  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NativeBaseProvider theme={theme} initialWindowMetrics={inset}>
        <SafeAreaProvider>
          <AuthProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </AuthProvider>
        </SafeAreaProvider>
      </NativeBaseProvider>
    );
  }
}
