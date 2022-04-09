/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

// Screens
import SignUpScreen from '../../screens/AuthScreens/SignUpScreen';
import SignInScreen from '../../screens/AuthScreens/SignInScreen';

// Types
import { AuthScreensParamList, AuthScreenProps } from '../../types';


/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const Stack = createStackNavigator<AuthScreensParamList>();

function AuthScreens() {
  const isSignout = false;
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={({ navigation }: AuthScreenProps<'SignUp'>) => ({
          title: '',
          // When logging out, a pop animation feels intuitive
          // You can remove this if you want the default 'push' animation
          animationTypeForReplace: isSignout ? 'pop' : 'push',
        })}
      />
    </Stack.Navigator>
  );
}

export default AuthScreens