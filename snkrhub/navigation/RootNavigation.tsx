/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';


// Auth  
import AuthScreens from './Auth/AuthScreens'

// App
import AppTabs  from './App/AppTabs';

// Types
import { RootStackParamList } from '../types';

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const userToken = 'a';
  return (
    <Stack.Navigator>
      {userToken == null ? (
          <Stack.Screen name="Root" component={AuthScreens} options={{ headerShown: false }} /> 
      ) : (
          <Stack.Screen name="Root" component={AppTabs} options={{ headerShown: false }} /> 
      )}
    </Stack.Navigator>
  );
}

