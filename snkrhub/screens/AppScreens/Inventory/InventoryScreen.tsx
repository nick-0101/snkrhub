import { Platform, UIManager } from 'react-native';
import { useEffect, useState, useCallback } from 'react';
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

// Apollo
import { useLazyQuery } from "@apollo/client";
import { FETCH_INVENTORY_ITEMS } from './queries'

// Context
import { useAuth } from '../../../context/AuthContext'

// Icons
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons'; 

// Components
import { InventoryItem } from '../../../components'; 

// Types
import { InventoryData } from '../types'
import { RootTabScreenProps } from '../../../types';

// enable animations on android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function InventoryScreen({ navigation }: RootTabScreenProps<'Inventory'>) {
  // Auth
  const { getUserToken } = useAuth()

  /*
  * Apollo
  */
  const [inventoryData, setInventoryData] = useState<InventoryData[]>()
  const [userToken, setUserToken] = useState<string | undefined>('')
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(2)

  const fetchInventoryItems = useCallback(async () => {
    // Get users jwt on every request
    const firebaseToken = await getUserToken()
    setUserToken(firebaseToken)

    // Call graphql query
    getInventoryItems({ 
      variables: {
        offset: offset,
        limit: limit,
        userId: 'QgshDQqg6dWIxsbW4YNQqNC0u6n2'
      },
      context: {
        headers: { 
          Authorization: userToken ? userToken : ''
        },
      },
    })
  }, [offset])

  useEffect(() => {
    fetchInventoryItems()
  }, [fetchInventoryItems])


  // Because we have to wait for getUserToken to return, we need to
  // execute the apollo query manually
  const [getInventoryItems, { loading, error, data }] = useLazyQuery(
    FETCH_INVENTORY_ITEMS
  );

  useEffect(() => {
    if(data) {
      setInventoryData(data.fetchUserInventoryItems)
    }
  }, [data])
  // if (error) return `Error! ${error}`;

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
            onPress={() => navigation.navigate("AddShoe")}
            icon={
              <Icon size={7} as={Ionicons} name="add" color="primary.600" />
            } 
          />
        </HStack>
      </HStack>

      <VStack px="6" mt="8" mb="5">
        <VStack>
          {inventoryData ? 
            <>
              {inventoryData.map((item: InventoryData, index: number) => {
                  return (
                    <InventoryItem 
                      key={index}
                      name={item.name}
                      size={item.shoesize}
                      price={item.purchaseprice}
                    />
                  )
                })}
            </>
            :
            null
          }
          {/* <InventoryItem 
            name={"Jordan 1 retro high asdasdasdasdasdasdasdads"}
            size={10.5}
            price="220"
          />
          <InventoryItem 
            name={"Jordan 1 retro high asdasdasdasdasdasdasdads"}
            size={10.5}
            price="550"
          />
          <InventoryItem 
            name={"Jordan 1 retro high asdasdasdasdasdasdasdads"}
            size={10.5}
            price="110"
          /> */}

        </VStack>
      </VStack>
    </Stack>
  );
}