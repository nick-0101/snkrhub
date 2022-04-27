import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "@expo/vector-icons";
import { Icon } from "native-base";

// Navigator components
import { AppTabBar } from './AppTabBar';

// Screens / navigators
import HomeScreen from '../../screens/AppScreens/Home/HomeScreen';
import InventoryScreen from '../../screens/AppScreens/Inventory/InventoryScreen';
import { InventoryNavigator } from './InventoryNavigator/InventoryNavigator';

// Types
import { RootTabParamList, RootTabScreenProps } from '../../types';

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function AppTabs() {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false
      }}
      tabBar={(props) => <AppTabBar {...props} />}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<'Home'>) => ({
          animationTypeForReplace: 'pop',
          tabBarTestID: "HomeScreenButton",
          tabBarIcon: () => <TabBarIcon name="grid" color={'primary.600'} />,
          tabBarIconOutline: () => <TabBarIcon name="grid-outline" color={'gray.500'} />,
        })}
      />

      <BottomTab.Screen
        name="Inventory"
        component={InventoryNavigator}
        options={({ navigation }: RootTabScreenProps<'Inventory'>) => ({
          tabBarTestID: "InventoryScreenButton",
          tabBarIcon: () => <TabBarIcon name="clipboard" color={'primary.600'} />,
          tabBarIconOutline: () => <TabBarIcon name="clipboard-outline" color={'gray.500'} />,
        })}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return <Icon 
    as={
      <Ionicons 
        name={props.name}
      />
    } 
    size={6} 
    color={props.color}
  />;
}

export default AppTabs