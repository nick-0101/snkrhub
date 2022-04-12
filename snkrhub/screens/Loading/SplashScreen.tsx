import { ActivityIndicator } from "react-native";
import {
  Button,
  VStack,
  Center,
  Stack,
} from "native-base";

// Types
import { RootTabScreenProps } from '../../types';

export default function SplashScreen({ navigation }: RootTabScreenProps<'Loading'>) {
  return (
    <Center>
        <Center 
            _text={{
                color: "white",
                fontWeight: "bold"
            }} 
            h="100%" 
            w="100%"
        >
            <ActivityIndicator size="large" color="#00ff00" />
        </Center>
    </Center>
  );
}