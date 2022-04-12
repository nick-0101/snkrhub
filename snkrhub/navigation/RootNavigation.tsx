/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext'

// Navigators
import AuthScreens from './Auth/AuthScreens'
import AppTabs  from './App/AppTabs';
import SplashScreen from '../screens/Loading/SplashScreen';

// Types
// import { RootTabParamList } from '../types';

type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  App: undefined
};

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
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} /> 
      :
      user === null ? (
        <Stack.Screen name="Auth" component={AuthScreens} options={{ headerShown: false }} /> 
      ) : (
        <Stack.Screen name="App" component={AppTabs} options={{ headerShown: false }} /> 
      )}
    </Stack.Navigator>
  );
}

