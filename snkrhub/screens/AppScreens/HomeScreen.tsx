import {
  Button,
  Checkbox,
  HStack,
  VStack,
  Text,
  Link,
  Center,
  StatusBar,
  Box,
  Stack,
} from "native-base";
import { useAuth } from '../../context/AuthContext'

// Types
import { RootTabScreenProps } from '../../types';

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  // Auth state
  const { signOutUser } = useAuth();

  return (
    <Center
        my="auto"
        background={'primary.600'}
        flex="1"
      >
        <Stack
          flexDirection={{ base: "column", md: "row" }}
          w="100%"
          maxW={{ md: "1016px" }}
          flex={{ base: "1", md: "none" }}
        >
          <VStack px="4" mt="20" mb="5">
            <VStack>
              <Button onPress={() => signOutUser()}>Click Me</Button>
            </VStack>
          </VStack>
        </Stack>
      </Center>
  );
}