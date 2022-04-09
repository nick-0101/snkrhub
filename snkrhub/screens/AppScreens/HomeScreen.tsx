import { View } from 'react-native';
import { Link } from "native-base";

// Types
import { RootTabScreenProps } from '../../types';

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  return (
    <View>
      <Link
            _text={{
              fontSize: "sm",
              fontWeight: "medium",
              textDecoration: "none",
              color: "primary.600",
            }}
            // onPress={() => {
            //   navigation.navigate("SignUp");
            // }}
          >
            Sign in
          </Link>
    </View>
  );
}