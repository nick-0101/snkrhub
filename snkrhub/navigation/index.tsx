/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

// Screens
import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

// Navigator
import RootNavigator from './RootNavigation'


export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// /**
//  * A root stack navigator is often used for displaying modals on top of all other content.
//  * https://reactnavigation.org/docs/modal
//  */
// const Stack = createNativeStackNavigator<RootStackParamList>();

// function RootNavigator() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Root" component={AppTabs} options={{ headerShown: false }} />
//     </Stack.Navigator>
//   );
// }

