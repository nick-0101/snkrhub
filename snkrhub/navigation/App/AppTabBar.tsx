import { useState, ReactNode} from 'react';
import {
  HStack,
  Text,
  Icon,
  Center,
  Box,
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
  const onSelect = (index: number) => {
    const selectedTabRoute = props.state.routeNames[index];
    props.navigation.navigate(selectedTabRoute);
  };

  // Create each tab
  const createNavigationTabForRoute = (route: RouteProp<RootTabParamList, any>) => {
    const { options }: { options: customTabOptions } = props.descriptors[route.key];

    const focused = props.descriptors[route.key].navigation.isFocused();
    
    console.log(options.tabBarIcon, options.tabBarIconOutline)

    return (
      <Pressable 
        key={route.key}
        opacity={focused ? 1 : 0.5} 
        py="3" 
        flex={1} 
        onPress={() => onSelect(props.state.index)}
      >
        <Center>
          <Icon 
            as={focused ? options.tabBarIcon : options.tabBarIconOutline} 
            color="white" 
            size="sm" 
          />
        </Center>
      </Pressable>
    );
  };

  return (
    <>
      <HStack 
        _light={{ bg: "gray.100", borderColor: 'gray.300' }}
        _dark={{ bg: "gray.900", borderColor: 'gray.700' }}
        alignItems="center" 
        safeAreaBottom
        borderTopWidth={1.7}
      >
        {props.state.routes.map(createNavigationTabForRoute)}
      </HStack>
    </>
  );
}