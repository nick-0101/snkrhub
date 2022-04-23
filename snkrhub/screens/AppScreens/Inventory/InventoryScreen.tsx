import { Platform, UIManager, Dimensions, TouchableOpacity, View } from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import {
  StatusBar,
  Box,
  VStack,
  HStack,
  Stack,
  IconButton,
  Icon,
  Text,
  Spinner,
  Avatar,
  Pressable
} from "native-base";
import { IPropsSwipeRow, RowMap, SwipeListView } from 'react-native-swipe-list-view';

// Apollo
import { useQuery, useLazyQuery } from "@apollo/client";
import { FETCH_INVENTORY_ITEMS } from './queries'

// Context
import { useAuth } from '../../../context/AuthContext'

// Icons
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons'; 

// Components
import { InventoryItem } from '../../../components'; 

// Types
import { InventoryData, InventorySwiperRow } from '../types'
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
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(2)

  const [getInventory, { loading, error, data }] = useLazyQuery(FETCH_INVENTORY_ITEMS, {
    fetchPolicy: "network-only", 
    errorPolicy: 'all',
    onCompleted: (data) => {
      setInventoryData(data.fetchUserInventoryItems)
    }
  })

  console.log(data, error)
  
  const fetchInventoryItems = useCallback(async () => {
    // Get users jwt on every request
    const firebaseToken = await getUserToken()

    if(firebaseToken) {
      getInventory({   
        variables: { 
          offset: offset,
          limit: limit,
        },
        context: {
          headers: { 
            Authorization: firebaseToken || ''
          },
        }
      })
    }
  }, [offset])

  useEffect(() => {
    fetchInventoryItems()
  }, [])

  /*
  * Inventory item action swiper
  */

  const closeRow = (rowMap: InventorySwiperRow, rowKey: string) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap: InventorySwiperRow, rowKey: string) => {
    closeRow(rowMap, rowKey);

    if(inventoryData) {
      const newData: InventoryData[] = Array.from(new Set(inventoryData));
      const prevIndex = inventoryData.findIndex(item => item.id === Number(rowKey));
      newData.splice(prevIndex, 1);
      setInventoryData(newData);
    }
  };

  const renderItem = ({
    item,
    index
  }: { item: InventoryData, index: number }) => (
    <Box>
      <Pressable 
        onPress={() => console.log('You touched me')} 
        alignItems="center" 
        _light={{ bg: "gray.100", borderColor: 'gray.200' }}
        _dark={{ bg: "gray.900", borderColor: 'gray.800' }}
        borderBottomWidth={1.5}
        justifyContent="center"  
        px="6"
      >
        <HStack width="100%">
          <InventoryItem 
            name={item.name}
            size={item.shoesize}
            price={item.purchaseprice}
            index={index}
          />
        </HStack>
      </Pressable>
    </Box>
  );

  const renderHiddenItem = (rowMap: any, rowKey: any) => (
    <HStack flex={1}>
      {/* Close */}
      <Pressable 
        mb="6" 
        px={4} 
        ml="auto" 
        bg="dark.500" 
        justifyContent="center" 
        onPress={() => closeRow(rowMap, data.id)} 
        _pressed={{
          opacity: 0.5
        }}
      >
        <Icon name="close" color="white" as={Ionicons}/>
      </Pressable>
      
      {/* Delete item */}
      <Pressable 
        mb="6" 
        px={4} 
        bg="red.500" 
        justifyContent="center"
        onPress={() => deleteRow(rowMap, data.id)}
        _pressed={{
          opacity: 0.5
        }}
      >
        <Text>Delete</Text>
      </Pressable>
    </HStack>
  );
  
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
      
      {/* Render data */}
      <VStack mt="8" mb="5">   
        {loading ? 
          <Spinner 
            size="lg"
            color={
              'gray.500'
            }
            accessibilityLabel="Loading inventory data" 
          /> 
          :
          null
        }  

        {data?.fetchUserInventoryItems ?
          <SwipeListView 
            keyExtractor={(item, index) => item.id.toString()}
            data={inventoryData} 
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            leftOpenValue={0}
            rightOpenValue={-128}
            previewRowKey={'0'}
            previewOpenValue={-40}
          />
          :
          null
        }   
      </VStack>
    </Stack>
  );
}