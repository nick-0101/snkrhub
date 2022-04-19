import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "@expo/vector-icons";
import { Icon } from "native-base";

// Navigator components
import HomeScreen from '../../screens/AppScreens/HomeScreen';
import { AppTabBar } from './AppTabBar';

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
          title: 'Home',
          animationTypeForReplace: 'pop',
          tabBarIcon: () => <TabBarIcon name="home" color={'gray.500'} />,
          tabBarIconOutline: () => <TabBarIcon name="home-outline" color={'primary.500'} />,
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