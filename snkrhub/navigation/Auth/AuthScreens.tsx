/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import * as React from 'react';

// Screens
import SignUpScreen from '../../screens/AuthScreens/SignUpScreen';
import SignInScreen from '../../screens/AuthScreens/SignInScreen';
import ForgotPasswordScreen from '../../screens/AuthScreens/ForgotPasswordScreen';

// Types
import { RootTabParamList } from '../../types';

const TransitionScreenOptions = {
  ...TransitionPresets.SlideFromRightIOS, // This is where the transition happens
};

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const Stack = createStackNavigator<RootTabParamList>();

function AuthScreens() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS
      }}
    >
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
      />
    </Stack.Navigator>
  );
}

export default AuthScreens