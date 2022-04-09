/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { theme } from 'native-base';

// Screens
import { RootTabs } from './screens/AppScreens/types'; 
import { AuthScreens } from './screens/AuthScreens/types'; 

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
  interface ICustomTheme extends CustomThemeType {}
}

// Enable typescript for custom theme
type CustomThemeType = typeof theme;

// ***************
// React navigation
// ***************

// Stack navigator props
export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
};

// Screen props
export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = RootTabs & AuthScreens;

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
