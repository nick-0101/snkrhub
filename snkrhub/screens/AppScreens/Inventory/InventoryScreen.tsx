import { Platform, UIManager } from 'react-native';
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

// Context
import { useAuth } from '../../../context/AuthContext'

// Icons
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons'; 

// Components
import { InventoryItem } from '../../../components'; 

// Types
import { RootTabScreenProps } from '../../../types';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

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
        px="4"
        py="2" 
        justifyContent="space-between" 
        alignItems="center"
        w="100%"
        borderBottomWidth={1.7}
      >
        <HStack alignItems="center">
          <IconButton 
            icon={
              <Icon 
                size={7} 
                as={Ionicons} 
                name="menu-outline" 
                _light={{
                  color: "gray.700",
                }}
                _dark={{
                  color: "gray.300", 
                }} 
              />
            } 
          />

          <HStack ml="3" alignItems={'center'}>
            <Icon
              size={5} 
              as={FontAwesome5} 
              name="box" 
              color={'primary.600'}
            />

            <Text
              pl="2.5"
              fontSize="xl"
              fontWeight="medium"
              _light={{
                color: "gray.700",
              }}
              _dark={{
                color: "gray.300", 
              }}
            >
              Inventory
            </Text>
          </HStack>
        </HStack>
        
        <HStack>
          <IconButton 
            icon={
              <Icon size={7} as={Ionicons} name="add" color="primary.600" />
            } 
          />
        </HStack>
      </HStack>

      <VStack px="6" mt="8" mb="5">
        <VStack>
          <InventoryItem 
            name={"Jordan 1 retro high asdasdasdasdasdasdasdads"}
            size={10.5}
            category="unlisted"
          />
          <InventoryItem 
            name={"Jordan 1 retro high asdasdasdasdasdasdasdads"}
            size={10.5}
            category="unlisted"
          />
          <InventoryItem 
            name={"Jordan 1 retro high asdasdasdasdasdasdasdads"}
            size={10.5}
            category="unlisted"
          />

        </VStack>
      </VStack>
    </Stack>
  );
}