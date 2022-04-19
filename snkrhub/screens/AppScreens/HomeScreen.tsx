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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// Context
import { useAuth } from '../../context/AuthContext'

// Types
import { RootTabScreenProps } from '../../types';

export function AnalyticsSection() {
  // Auth state
  const { signOutUser, getUserToken } = useAuth();

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
      style={{ flex: 1 }}
    >
      {/* Portfolio summary */}
      <VStack 
        _light={{ bg: "gray.100" }}
        _dark={{ bg: "gray.900" }}
      >
        <VStack
          px="6"
          py="9"
          background={'primary.600'}
          justifyContent="space-between"
          borderBottomRightRadius={{ base: "3xl", }}
          borderTopRightRadius={{ base: "0", }}
          borderBottomLeftRadius={{ base: "3xl" }}
        > 
          {/* Title */}
          <Text
            fontSize="lg"
            fontWeight="semibold"
            color="gray.50"
          >
            Inventory Value
          </Text>

          {/* Value */}
          <HStack alignItems={'center'}>
            <Text fontSize="lg" color="gray.50" pr="1" fontWeight="bold">$</Text>
            <Text fontSize="4xl" fontWeight="bold" color="gray.50">
              1202.00
            </Text>

            <Box 
              alignSelf="center" 
              ml="auto" 
              borderRadius={9}
              px="2.5"
              py="1"
              style={{backgroundColor: 'rgba(191, 219, 254, 0.3)'}}
            >
              <Text fontSize="sm" color="blue.50" fontWeight="bold" opacity={100}>
                + 2.32%
              </Text>
            </Box>
          </HStack>

          {/* Info */}
          <Text color="blue.200">25 items on April 17, 2022</Text>
        </VStack>
      </VStack>

      <VStack
        px="6"
        py="5"
        _light={{ bg: "gray.100" }}
        _dark={{ bg: "gray.900" }}
        space="3"
        justifyContent="space-between"
        flex="1"
      >      
        <VStack space="7">
          <VStack>
            <Button onPress={() => getUserToken()}>Get token</Button>
            <Button onPress={() => signOutUser()}>Sign out</Button>
          </VStack>
        </VStack>

        {/* <HStack
          mb="2"
          space="1"
          safeAreaBottom
          alignItems="center"
          justifyContent="center"
          mt={{ base: "auto", md: "12" }}
        >

        </HStack> */}
      </VStack>
    </KeyboardAwareScrollView>
  )
}

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Box
        safeAreaTop
        background={'primary.600'}
      />
      <Center
        my="auto"
        background={'primary.600'}
        flex="1"
      >
        <Stack
          flexDirection={{ base: "column", md: "row" }}
          w="100%"
          flex={{ base: "1" }}
        >            
          <AnalyticsSection />
        </Stack>
      </Center>
    </>
  );
}