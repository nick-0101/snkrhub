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
  Input,
  FormControl
} from "native-base";
// Types
import { RootTabScreenProps } from '../../types';

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
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
              <Text>Sign up</Text>
            </VStack>
          </VStack>
        </Stack>
      </Center>
  );
}