import {
  Button,
  VStack,
  Center,
  Stack,
  Text
} from "native-base";
import { useAuth } from '../../context/AuthContext'

// Types
import { RootTabScreenProps } from '../../types';

export default function InventoryScreen({ navigation }: RootTabScreenProps<'Inventory'>) {
  // Auth state
  const { signOutUser, getUserToken } = useAuth();

  return (
    <Center
      my="auto"
      _light={{ bg: "gray.100" }}
      _dark={{ bg: "gray.900" }}
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
            <Text>Inventory screen</Text>
          </VStack>
        </VStack>
      </Stack>
    </Center>
  );
}