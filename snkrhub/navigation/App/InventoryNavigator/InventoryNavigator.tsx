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
      screenOptions={() => {
        return {
          gestureEnabled: true,
          cardOverlayEnabled: true,
          ...TransitionPresets.ModalPresentationIOS,
        };
      }}
      initialRouteName='Inventory'
    >
      <Stack.Screen name={'Inventory'} component={InventoryScreen} />
      <Stack.Screen name={'AddShoe'} component={AddShoeScreen} />
    </Stack.Navigator>
  );
};
