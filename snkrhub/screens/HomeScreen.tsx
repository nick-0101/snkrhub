import { View, Text } from 'react-native';

import { RootTabScreenProps } from '../types';

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
}