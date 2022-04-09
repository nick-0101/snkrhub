/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { theme } from 'native-base';

// Screen list
import { AuthScreensParamList } from './screens/AuthScreens/types'
import { RootTabParamList } from './screens/AppScreens/types'

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
    interface AuthParamList extends AuthStackParamList {}
  }
  interface ICustomTheme extends CustomThemeType {}
}

// Enable typescript for custom theme
type CustomThemeType = typeof theme;


// React navigation
export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
};

export type AuthStackParamList = {
  Root: NavigatorScreenParams<AuthScreensParamList> | undefined;
};

export { AuthScreensParamList, RootTabParamList };

// export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
//   RootStackParamList,
//   Screen
// >;

// Screen props
export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

export type AuthScreenProps<Screen extends keyof AuthScreensParamList> = CompositeScreenProps<
  BottomTabScreenProps<AuthScreensParamList, Screen>,
  NativeStackScreenProps<AuthStackParamList>
>;