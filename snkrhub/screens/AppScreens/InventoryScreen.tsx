import {
  StatusBar,
  Box,
  VStack,
  HStack,
  Stack,
  IconButton,
  Icon,
  Text
} from "native-base";
import { useAuth } from '../../context/AuthContext'
import { Ionicons } from "@expo/vector-icons";

// Types
import { RootTabScreenProps } from '../../types';

export default function InventoryScreen({ navigation }: RootTabScreenProps<'Inventory'>) {
  // Auth state
  const { signOutUser, getUserToken } = useAuth();

  return (
    <Stack
      flexDirection={{ base: "column", md: "row" }}
      w="100%"
      flex={1}
      _light={{ bg: "gray.100" }}
      _dark={{ bg: "gray.900" }}
    >
      {/* header */}
      <StatusBar 
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Box 
        safeAreaTop 
        _light={{ bg: "gray.200" }}
        _dark={{ bg: "gray.800" }}
      />
      <HStack 
        _light={{ bg: "gray.200", borderColor: 'gray.300' }}
        _dark={{ bg: "gray.800", borderColor: 'gray.700' }} 
        px="1" 
        py="2.5" 
        justifyContent="space-between" 
        alignItems="center"
        w="100%"
        borderBottomWidth={1.7}
      >
        <HStack alignItems="center">
          <IconButton icon={<Icon size={7} as={Ionicons} name="menu-outline" color="primary.600" />} />
          <Text
            pl="2"
            fontSize="xl"
            fontWeight="medium"
            _light={{
              color: "gray.700",
            }}
            _dark={{
              color: "gray.300", 
            }}
          >
            Sign in
          </Text>
        </HStack>
        
        <HStack>
          <IconButton 
            icon={
              <Icon size={7} as={Ionicons} name="add" color="primary.600" />
            } 
          />
        </HStack>
      </HStack>

      <VStack px="4" mt="20" mb="5">
        <VStack>
          <Text>Inventory screen</Text>
        </VStack>
      </VStack>
    </Stack>
  );
}