import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

// Screens
import InventoryScreen from '../../../screens/AppScreens/Inventory/InventoryScreen';
import AddShoeScreen from '../../../screens/AppScreens/Inventory/AddShoeScreen';

const Stack = createStackNavigator();

export const InventoryNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='InventoryNest'
      screenOptions={{
        cardOverlayEnabled: true,
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.ModalPresentationIOS,
        presentation: 'modal'
      }}
    >
      <Stack.Screen name={'InventoryNest'} component={InventoryScreen} />
      <Stack.Screen name={'AddShoe'} component={AddShoeScreen} />
    </Stack.Navigator>
  );
};
