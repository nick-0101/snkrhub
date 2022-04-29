import { useEffect, useState, useCallback, useMemo } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  Button,
  HStack,
  VStack,
  Text,
  Center,
  StatusBar,
  Box,
  Stack,
  Spinner,
} from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { CountUp } from 'use-count-up'

// Dayjs
import dayjs from 'dayjs'

// Apollo
import { useLazyQuery } from "@apollo/client";
import { 
  FETCH_INVENTORY_ANALYTICS,
  FETCH_INVENTORY_RANGE
} from './queries'

// Functions
import { formatChart } from '../../../functions/formatChart';

// Context
import { useAuth } from '../../../context/AuthContext'

// Components
import { AnalyticsChart } from '../../../components';

// Types
import { AnalyticsData, FormattedAnalyticsData } from '../types'
import { RootTabScreenProps } from '../../../types';

export function AnalyticsSection() {
  // Auth state
  const { signOutUser, getUserToken } = useAuth();

  // Extra
  const logToken = async() => {
    const firebaseToken = await getUserToken()

    console.log(firebaseToken)
  }


  // READ
  // The inventory value system was created wrong, instead of storing each inventory
  // value in a seperate record, you need to store the total value. When a user adds
  // a new shoe, you take the previous inventory value and add the value of the new shoe
  // too it, you then store this value as a new record.

  // TODO
  //
  // I need to change the updateAnalyticsForItemDelete resolver to get the last record,
  // subtract the purchase amount by the last value, and create a new record

  /*
  * Apollo
  */
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>()
  const [analyticsRangeData, setAnalyticsRangeData] = useState<FormattedAnalyticsData[]>()
  const [maxYValue, setMaxYValue] = useState(0)
  const [rangeSelected, setRangeSelected]= useState(7)

  // Queries
  const [getInventoryAnalytics, { 
    data: inventoryAnalyticsData, 
  }] = useLazyQuery(FETCH_INVENTORY_ANALYTICS, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      setAnalyticsData(data.fetchInventoryAnalytics)
    }
  })

  const [getInventoryAnalyticsRange, { 
    loading: inventoryAnalyticsRangeLoading, 
    data: inventoryAnalyticsRangeData, 
  }] = useLazyQuery(FETCH_INVENTORY_RANGE, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      if(data.fetchInventoryValueRange || data.fetchInventoryValueRange.length) {
        const formattedChart = formatChart(data.fetchInventoryValueRange)
  
        // Set chart data
        setAnalyticsRangeData(formattedChart.chartFormattedData)
  
        // Set max y value for chart
        setMaxYValue(formattedChart.chartYMax)
      }
    }
  })

  // Fetch inital analytics data
  useEffect(() => {
    fetchInventoryAnalytics()
  }, [])

  const fetchInventoryAnalytics = useCallback(async () => {
    // Get users jwt on every request
    const firebaseToken = await getUserToken()
    
    // Basic inventory analytics
    getInventoryAnalytics({   
      context: {
        headers: { 
          Authorization: firebaseToken
        },
      }
    })

    // Inventory chart data
    getInventoryAnalyticsRange({
      variables: {
        rangeInDays: 10000
      },
      context: {
        headers: { 
          Authorization: firebaseToken
        },
      }
    })
  }, [])

  const fetchInventoryAnalyticsRange = async(range: number) => {
    // Get users jwt on every request
    const firebaseToken = await getUserToken()
    getInventoryAnalyticsRange({
      variables: {
        rangeInDays: range
      },
      context: {
        headers: { 
          Authorization: firebaseToken
        },
      }
    }).then((response) => {
      const formattedChart = formatChart(response.data.fetchInventoryValueRange)

      // Set chart data
      setAnalyticsRangeData(formattedChart.chartFormattedData)

      // Set max y value for chart
      setMaxYValue(formattedChart.chartYMax)
    })
  }

  /*
  * Chart
  */
  const [inventoryValueSlider, setInventoryValueSlider] = useState(0)

  // Called by tooltip as user moves over chart
  const changeInventoryValue = (amount: number) => {
    setInventoryValueSlider(amount)
  }

  // Set inventory value to default value once user stops dragging tooltip
  const changeInventoryValueToDefault = (shouldChange: boolean) => {
    if(shouldChange && analyticsData) {
      setInventoryValueSlider(analyticsData.inventoryvalue)
    }
  }

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
          pt="9"
          pb="6"
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
            {inventoryAnalyticsData?.fetchInventoryAnalytics ? 
              <Text fontSize="4xl" fontWeight="bold" color="gray.50">
                
                {inventoryValueSlider === 0 ?
                  <> 
                    <CountUp isCounting start={0} end={analyticsData?.inventoryvalue} duration={0.7} />
                  </>
                : 
                  <>
                    {inventoryValueSlider}
                  </>
                }
              </Text>
              :
              <Text fontSize="4xl" fontWeight="bold" color="gray.50">
                0.00
              </Text>
            }

            <Box 
              alignSelf="center" 
              ml="auto" 
              borderRadius={6}
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
          {inventoryAnalyticsData?.fetchInventoryAnalytics ?
            <Text color="blue.200">
              {analyticsData?.inventorycount} Items on {dayjs().locale('en').format("MMMM DD, YYYY")} 
            </Text>
          :
            <Text color="blue.200">
              0 items on {dayjs().locale('en').format("MMMM DD, YYYY")} 
            </Text>
          }

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
            <Button onPress={() => logToken()}>Get token</Button>
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

        {/* Inventory value chart */}
        {inventoryAnalyticsRangeLoading ? 
          <Spinner 
            pt="5"
            pb="3"
            size="sm"
            color={
              'gray.500'
            }
            accessibilityLabel="Loading chart data" 
          /> 
          :
          null
        }  

        {analyticsRangeData?.length ? 
          <AnalyticsChart 
            changeInventoryValue={changeInventoryValue}
            changeInventoryValueToDefault={changeInventoryValueToDefault}

            analyticsRangeData={analyticsRangeData}
            maxYValue={maxYValue}
          />
        :
          null
        }
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