import { View, Text } from 'react-native';

import { RootTabScreenProps } from '../../types';

export default function SignInScreen({ navigation }: RootTabScreenProps<'SignIn'>) {
  return (
    <View>
      <Text>Signin</Text>
    </View>
  );
}