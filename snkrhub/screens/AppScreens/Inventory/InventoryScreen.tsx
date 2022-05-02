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
  Text,
  Spinner,
  Pressable,
  Button
} from "native-base";
import { SwipeListView } from 'react-native-swipe-list-view';

// Apollo
import { useLazyQuery, useMutation } from "@apollo/client";
import { 
  // Inventory
  FETCH_INVENTORY_ITEMS,
  DELETE_INVENTORY_ITEM,
  MARK_INVENTORY_ITEM_SOLD,

  // Analytics
  DELETE_INVENTORY_ANALYTICS,
  UPDATE_INVENTORY_ANALYTICS_ITEM_SOLD
} from './queries'

// Context
import { useAuth } from '../../../context/AuthContext'

// Icons
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

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

export default function InventoryScreen({ navigation, route }: RootTabScreenProps<'InventoryNest'>) {
  // Auth context
  const { getUserToken } = useAuth()

  const clearParams = () => {
    navigation.setParams({ addedInventory: null })
  }

  /*
  * Apollo
  */
  const [inventoryData, setInventoryData] = useState<InventoryData[]>()

  // Queries
  const [getInventory, { 
    loading: getInventoryLoading, 
    data: getInventoryData, 
    fetchMore
  }] = useLazyQuery(FETCH_INVENTORY_ITEMS, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      setInventoryData(data.fetchUserInventoryItems)
    }
  })

  // Mutations
  const [removeInventoryItem, { reset: removeInventoryItemReset }] = useMutation(DELETE_INVENTORY_ITEM, {
    notifyOnNetworkStatusChange: true
  })

  const [removeInventoryAnalytics] = useMutation(DELETE_INVENTORY_ANALYTICS, {
    notifyOnNetworkStatusChange: true
  })

  const [markInventoryItemSold, { reset: markInventoryItemSoldReset}] = useMutation(MARK_INVENTORY_ITEM_SOLD, {
    notifyOnNetworkStatusChange: true
  })

  const [updateInventoryAnalyticsItemSold] = useMutation(UPDATE_INVENTORY_ANALYTICS_ITEM_SOLD, {
    notifyOnNetworkStatusChange: true
  })

  
  // Fetch inital inventory data
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      fetchInventoryItems()
    });
    
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe
  }, [])
  
  const fetchInventoryItems = useCallback(async () => {
    // Get users jwt on every request
    const firebaseToken = await getUserToken()
    getInventory({   
      variables: { 
        offset: 0,
        limit: 8,
      },
      context: {
        headers: { 
          Authorization: firebaseToken
        },
      }
    })
  }, [])

  // Fetches more items as user scrolls
  const fetchMoreInventoryItems = () => {
    fetchMore({
      variables: {
        offset: inventoryData?.length
      },            
    })
  }

  // If user has returned from AddShoe screen check if we need to refresh inventory
  useEffect(() => {
    if(route.params?.addedInventory) {
      fetchInventoryItems()
    }
  }, [route.params?.addedInventory])


  /*
  * Inventory item action swiper
  */
  const closeRow = (rowMap: InventorySwiperRow, rowKey: number) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const markSold = async(rowMap: InventorySwiperRow, rowKey: number) => {
    closeRow(rowMap, rowKey);

    if(inventoryData) {
      // Find item index
      const newData: InventoryData[] = Array.from(new Set(inventoryData));
      const prevIndex = inventoryData.findIndex(item => item.id === rowKey);
      
      // Keep track of inventory item price and id for analytics mutation
      const itemPurchasePrice = inventoryData[prevIndex].purchaseprice

      // Remove item
      const removedItem = newData.splice(prevIndex, 1);
      setInventoryData(newData);
  
      // Mark item as sold
      const firebaseToken = await getUserToken()
      markInventoryItemSold({
        variables: {
          itemId: rowKey
        },
        context: {
          headers: { 
            Authorization: firebaseToken
          },
        }
      }).catch((err) => {
        // Undo ui changes
        newData.splice(prevIndex, 0, ...removedItem)
        setInventoryData(newData);

        // reset the mutation's result to its initial, uncalled state
        markInventoryItemSoldReset()
      })

      // Update inventory analytics database
      updateInventoryAnalyticsItemSold({
        variables: {
          inventoryItem: {
            purchaseprice: itemPurchasePrice
          }
        },
        context: {
          headers: { 
            Authorization: firebaseToken
          },
        }
      }).catch((err) => {
        console.log(err)
      })

      // Refetch inventory query
      fetchInventoryItems()
    }
  }

  const deleteRow = async (rowMap: InventorySwiperRow, rowKey: number) => {
    closeRow(rowMap, rowKey);

    if(inventoryData) {
      // Find item index
      const newData: InventoryData[] = Array.from(new Set(inventoryData));
      const prevIndex = inventoryData.findIndex(item => item.id === rowKey);
      
      // Keep track of inventory item price for analytics mutation
      const purchasePrice = inventoryData[prevIndex].purchaseprice

      // Remove item
      const removedItem = newData.splice(prevIndex, 1);
      setInventoryData(newData);
      
      // Remove inventory item from inventory database
      const firebaseToken = await getUserToken()
      removeInventoryItem({
        variables: {
          itemId: rowKey
        },
        context: {
          headers: { 
            Authorization: firebaseToken
          },
        }
      }).catch((err) => {
        // Undo ui changes
        newData.splice(prevIndex, 0, ...removedItem)
        setInventoryData(newData);

        // reset the mutation's result to its initial, uncalled state
        removeInventoryItemReset()
      })

      // Update inventory analytics database
      removeInventoryAnalytics({
        variables: {
          inventoryItem: {
            purchaseprice: purchasePrice
          }
        },
        context: {
          headers: { 
            Authorization: firebaseToken
          },
        }
      }).catch((err) => {
        console.log(err)
      })

      // Refetch inventory query
      fetchInventoryItems()
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

  const renderHiddenItem = ({item}: { item: InventoryData }, rowMap: any) => (
    <HStack flex={1}>
      {/* Close */}
      <Pressable 
        px={3}  
        ml="auto" 
        _light={{ bg: "success.400", _pressed: { bg: 'success.300' } }}
        _dark={{ bg: "success.500", _pressed: { bg: 'success.400' }}}
        justifyContent="center" 
        onPress={() => markSold(rowMap, item.id)} 
        _pressed={{
          bg: 'success.400'
        }}
      >
        {/* <Icon name="tag" size="28" color="white" as={FontAwesome5}/> */}
        <Text
          fontSize={'sm'}
          color="white"
          fontWeight={'bold'}
        >
          Mark sold
        </Text>
      </Pressable>
      
      {/* Delete item */}
      <Pressable 
        px={5} 
        _light={{ bg: "danger.400", _pressed: { bg: 'danger.300' } }}
        _dark={{ bg: "danger.500", _pressed: { bg: 'danger.400' }}}
        justifyContent="center"
        onPress={() => deleteRow(rowMap, item.id)}
        _pressed={{
          bg: 'danger.400'
        }}
      >
        <Text
          fontSize={'sm'}
          color="white"
          fontWeight={'bold'}
        >
          Delete
        </Text>
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
            onPress={() => {navigation.navigate("AddShoe"), clearParams()}}
            icon={
              <Icon size={7} as={Ionicons} name="add" color="primary.600" />
            } 
          />
        </HStack>
      </HStack>
      
      {/* Render data */}
      {getInventoryLoading ? 
        <Spinner 
          pt="5"
          pb="3"
          size="lg"
          color={
            'gray.500'
          }
          accessibilityLabel="Loading inventory data" 
        /> 
        :
        null
      }  

      {getInventoryData?.fetchUserInventoryItems ?
        // Inventory items
        <SwipeListView 
          keyExtractor={(item, index) => item.id.toString()}
          data={inventoryData} 
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={0}
          rightOpenValue={-167}
          previewRowKey={'0'}
          previewOpenValue={-40}
          onEndReached={({ distanceFromEnd }) => {
            if (distanceFromEnd < 0) return;
            fetchMoreInventoryItems()
          }}
          onEndReachedThreshold={0.5}
        />
        :
        null
      }

      {/* No inventory items */}
      {!getInventoryLoading && !getInventoryData?.fetchUserInventoryItems ? 
        <VStack
          my="auto"
          justifyContent="center" 
          alignItems="center"
        >
          <Text
            fontSize="xl"
          >
            No inventory items
          </Text>
        </VStack>  
      : 
        null
      }
    </Stack>
  );
}