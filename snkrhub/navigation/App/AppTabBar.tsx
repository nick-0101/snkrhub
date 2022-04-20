import { ReactNode} from 'react';
import {
  HStack,
  Icon,
  Center,
  Pressable
} from "native-base";

// Types
import { RootTabParamList } from '../../types';
import { BottomTabBarProps, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';  
import type { RouteProp } from '@react-navigation/native';

// Extend bottom nav option type with tab bar outline
interface customTabOptions extends BottomTabNavigationOptions {
  tabBarIconOutline?: (props: {
    focused: boolean;
    color: string;
    size: number;
  }) => ReactNode;
}

export const AppTabBar = (props: BottomTabBarProps) => {

  // When user clicks on tab
  const onSelect = (selectedRoute: string) => {
    props.navigation.navigate(selectedRoute);
  };

  // Create each tab
  const createNavigationTabForRoute = (route: RouteProp<RootTabParamList, any>) => {
    const { options }: { options: customTabOptions } = props.descriptors[route.key];
    const focused = props.descriptors[route.key].navigation.isFocused();

    // Select route name to navigate 
    const routeToNav = route.key.split('-', 1)[0]
    return (
      <Pressable 
        key={route.key}
        py="3" 
        flex={1} 
        testID={options.tabBarTestID}
        onPress={() => onSelect(routeToNav)}
      >
        <Center>
          <Icon 
            as={focused ? options.tabBarIcon : options.tabBarIconOutline} 
            size="sm" 
          />
        </Center>
      </Pressable>
    );
  };

  return (
    <>
      <HStack 
        _light={{ bg: "gray.200", borderColor: 'gray.300' }}
        _dark={{ bg: "gray.800", borderColor: 'gray.700' }} 
        alignItems="center" 
        safeAreaBottom
        borderTopWidth={1.7}
      >
        {props.state.routes.map(createNavigationTabForRoute)}
      </HStack>
    </>
  );
}