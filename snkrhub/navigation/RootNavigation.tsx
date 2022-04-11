/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { useAuth } from '../context/AuthContext'

// Navigators
import AuthScreens from './Auth/AuthScreens'
import AppTabs  from './App/AppTabs';
import LoadingScreen from '../screens/Loading/LoadingScreen';

// Types
import { RootStackParamList } from '../types';

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  // Auth state
  const { user, loading } = useAuth();

  return (
    <Stack.Navigator>
      {loading ?
        <Stack.Screen name="Root" component={LoadingScreen} options={{ headerShown: false }} /> 
      :
      user == null ? (
        <Stack.Screen name="Root" component={AuthScreens} options={{ headerShown: false }} /> 
      ) : (
        <Stack.Screen name="Root" component={AppTabs} options={{ headerShown: false }} /> 
      )}
    </Stack.Navigator>
  );
}

