import { useState } from 'react';
import {
  FormControl,
  Input,
  VStack,
  HStack,
  Stack,
  IconButton,
  Icon,
  Text,
  Button,
  ScrollView,
} from "native-base";
import { Platform } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// Packages
import { Formik } from 'formik';
import { Ionicons } from "@expo/vector-icons";
import { AddShoeSchema } from './Schemas/AddShoeSchema';

// Apollo
import { useMutation } from "@apollo/client";
import { 
  ADD_INVENTORY_ITEM,
  ADD_INVENTORY_ANALYTICS
} from './queries'

// Components
import { FormError } from '../../../components'

// Context
import { useAuth } from '../../../context/AuthContext'

// Types
import { RootTabScreenProps } from '../../../types';

export default function AddShoeScreen({ navigation }: RootTabScreenProps<'AddShoe'>) {
  // Auth context
  const { getUserToken } = useAuth()
  
  /*
  * Apollo
  */
 const [formLoader, setFormLoader] = useState(false)

  // Mutations
  const [addInventoryItem] = useMutation(ADD_INVENTORY_ITEM, {
    notifyOnNetworkStatusChange: true,
    errorPolicy: 'all',
  })

  const [addInventoryAnalytics] = useMutation(ADD_INVENTORY_ANALYTICS, {
    notifyOnNetworkStatusChange: true,
    errorPolicy: 'all',
    onCompleted: (data) => {
      navigation.navigate('InventoryNest', { addedInventory: true })
    }
  })

  return (
    <>
      <Stack
      flexDirection={"column"}
      w="100%"
      flex={1}
      _light={{ bg: "gray.100" }}
      _dark={{ bg: "gray.900" }}
    >
      {/* header */}
      <HStack 
        _light={{ bg: "gray.200", borderColor: 'gray.300' }}
        _dark={{ bg: "gray.800", borderColor: 'gray.700' }} 
        px="4"
        py="2" 
        alignItems="center"
        w="100%"
        borderBottomWidth={1.7}
      >
        <HStack pl="8" mx="auto" alignItems={'center'}>
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
                Add item
            </Text>
        </HStack>
        
        <IconButton 
            onPress={() => navigation.goBack()}
            icon={
                <Icon size={7} as={Ionicons} name="close" color="primary.600" />
            } 
        />
      </HStack>
      
       <KeyboardAwareScrollView
            enableOnAndroid
            enableAutomaticScroll
            keyboardOpeningTime={0}
            extraHeight={Platform.select({ android: 200 })}
        >
            <ScrollView px="4"> 
                <VStack py="4">
                    {/* Form pt="5" pb="5" mt="8" mb="5"*/}
                    <Formik
                        validateOnChange={false}
                        validateOnBlur={false}
                        validationSchema={AddShoeSchema}
                        initialValues={{
                            name: '',
                            styleid: '',
                            brand: '',
                            colour: '',
                            condition: '',
                            shoesize: '',
                            purchaseprice: '',
                            tax: '',
                            shipping: '',
                            purchasedate: '',
                            ordernumber: ''
                        }}
                        onSubmit={async(values) => {         
                            setFormLoader(true)

                            // Fetch firebhase token and send request
                            const firebaseToken = await getUserToken()
                            addInventoryItem({
                                variables: {
                                    inventoryItem: {
                                        name: values.name,
                                        styleid: values.styleid,
                                        brand: values.brand,
                                        colour: values.colour,
                                        condition: values.condition,
                                        shoesize: parseFloat(values.shoesize),
                                        purchaseprice: parseFloat(values.purchaseprice),
                                        tax: parseFloat(values.tax),
                                        shipping: parseFloat(values.shipping),
                                        purchasedate: values.purchasedate,
                                        ordernumber: values.ordernumber
                                    }
                                },
                                context: {
                                    headers: { 
                                        Authorization: firebaseToken || ''
                                    },
                                }
                            }).catch((err) => {
                                console.log(err)
                            })

                            // Update inventory analytics database
                            addInventoryAnalytics({
                                variables: {
                                    inventoryItem: {
                                        purchaseprice: parseFloat(values.purchaseprice)
                                    }
                                },
                                context: {
                                    headers: { 
                                        Authorization: firebaseToken || ''
                                    },
                                }
                            }).catch((err) => {
                                console.log(err.networkError.result.errors)
                            })

                            setFormLoader(false)
                        }}
                    >
                        {({
                            handleChange,
                            handleSubmit,
                            setFieldValue,
                            values,
                            dirty,
                            errors
                        }) => (
                            <VStack space="5">
                                <VStack space={{ base: "3",}}>
                                    {/* Name Input */}
                                    <FormControl bg="transparent" isRequired isInvalid={errors.name ? true : false}>
                                        <FormControl.Label  
                                            _text={{
                                                bold: true
                                            }}
                                        >
                                            Name{' '}
                                        </FormControl.Label> 
                                        <Input
                                            isRequired
                                            label="text"
                                            placeholder="Nike Dunk Low"
                                            defaultValue={values.name}
                                            onChangeText={handleChange('name')}
                                            accentColor={"#2563eb"}
                                        />

                                        {errors.name ? 
                                            <FormError error={errors.name} />
                                        : null}
                                    </FormControl>
                                    
                                    {/* Styleid & brand input */}
                                    <HStack mt="2" justifyContent={'space-between'}>
                                        {/* Style ID Input */}
                                        <FormControl 
                                            bg="transparent" 
                                            isInvalid={errors.styleid ? true : false}
                                            w="48%"
                                        >
                                            <FormControl.Label  
                                                _text={{
                                                    bold: true
                                                }}
                                            >
                                                Style ID{' '}
                                            </FormControl.Label> 
                                            <Input
                                                label="text"
                                                placeholder="DD1391-100"
                                                defaultValue={values.styleid}
                                                onChangeText={handleChange('styleid')}
                                            />

                                            {errors.styleid  ? 
                                                <FormError error={errors.styleid} />
                                            : null}
                                        </FormControl>

                                        {/* Brand Input */}
                                        <FormControl 
                                            bg="transparent" 
                                            isInvalid={errors.brand ? true : false}
                                            w="48%"
                                        >
                                            <FormControl.Label  
                                                _text={{
                                                    bold: true
                                                }}
                                            >
                                                Brand{' '}
                                            </FormControl.Label> 
                                            <Input
                                                label="text"
                                                placeholder="Nike"
                                                defaultValue={values.brand}
                                                onChangeText={handleChange('brand')}
                                            />

                                            {errors.brand  ? 
                                                <FormError error={errors.brand} />
                                            : null}
                                        </FormControl>
                                    </HStack>

                                    {/* Colour & condition input */}
                                    <HStack mt="2" justifyContent={'space-between'}>
                                        {/* Colour Input */}
                                        <FormControl 
                                            bg="transparent" 
                                            isInvalid={errors.colour ? true : false}
                                            w="48%"
                                        >
                                            <FormControl.Label  
                                                _text={{
                                                    bold: true
                                                }}
                                            >
                                                Colour{' '}
                                            </FormControl.Label> 
                                            <Input
                                                label="text"
                                                placeholder="White/Black"
                                                defaultValue={values.colour}
                                                onChangeText={handleChange('colour')}
                                            />

                                            {errors.colour  ? 
                                                <FormError error={errors.colour} />
                                            : null}
                                        </FormControl>

                                        {/* Condition Input */}
                                        <FormControl 
                                            bg="transparent" 
                                            isInvalid={errors.condition ? true : false}
                                            w="48%"
                                        >
                                            <FormControl.Label  
                                                _text={{
                                                    bold: true
                                                }}
                                            >
                                                Condition{' '}
                                            </FormControl.Label> 
                                            <Input
                                                label="text"
                                                placeholder="New"
                                                defaultValue={values.condition}
                                                onChangeText={handleChange('condition')}
                                            />

                                            {errors.condition  ? 
                                                <FormError error={errors.condition} />
                                            : null}
                                        </FormControl>
                                    </HStack>

                                    {/* Shoe Size & Purchase Price input */}
                                    <HStack mt="2" justifyContent={'space-between'}>
                                        {/* Shoe Size Input */}
                                        <FormControl 
                                            bg="transparent"
                                            isRequired 
                                            isInvalid={errors.shoesize ? true : false}
                                            w="48%"
                                        >
                                            <FormControl.Label  
                                                _text={{
                                                    bold: true
                                                }}
                                            >
                                                Shoe Size{' '}
                                            </FormControl.Label> 
                                            <Input
                                                isRequired
                                                keyboardType="decimal-pad"
                                                label="number"
                                                placeholder="11"
                                                defaultValue={values.shoesize}
                                                onChangeText={handleChange('shoesize')}
                                            />

                                            {errors.shoesize ? 
                                                <FormError error={errors.shoesize} />
                                            : null}
                                        </FormControl>

                                        {/* Purchase Price Input */}
                                        <FormControl 
                                            bg="transparent" 
                                            isRequired
                                            isInvalid={errors.purchaseprice ? true : false}
                                            w="48%"
                                        >
                                            <FormControl.Label  
                                                _text={{
                                                    bold: true
                                                }}
                                            >
                                                Purchase price (USD){' '}
                                            </FormControl.Label> 
                                            <Input
                                                isRequired
                                                keyboardType="decimal-pad"
                                                label="number"
                                                placeholder="270"
                                                defaultValue={values.purchaseprice}
                                                onChangeText={handleChange('purchaseprice')}
                                            />

                                            {errors.purchaseprice ? 
                                                <FormError error={errors.purchaseprice} />
                                            : null}
                                        </FormControl>
                                    </HStack>

                                    {/* Tax & Shipping input */}
                                    <HStack mt="2" justifyContent={'space-between'}>
                                        {/* Tax Input */}
                                        <FormControl 
                                            bg="transparent" 
                                            isInvalid={errors.tax ? true : false}
                                            w="48%"
                                        >
                                            <FormControl.Label  
                                                _text={{
                                                    bold: true
                                                }}
                                            >
                                                Tax{' '}
                                            </FormControl.Label> 
                                            <Input
                                                keyboardType="decimal-pad"
                                                label="number"
                                                placeholder="0.00"
                                                defaultValue={values.tax}
                                                onChangeText={handleChange('tax')}
                                            />

                                            {errors.tax  ? 
                                                <FormError error={errors.tax} />
                                            : null}
                                        </FormControl>

                                        {/* Shipping Input */}
                                        <FormControl 
                                            bg="transparent" 
                                            isInvalid={errors.shipping ? true : false}
                                            w="48%"
                                        >
                                            <FormControl.Label  
                                                _text={{
                                                    bold: true
                                                }}
                                            >
                                                Shipping{' '}
                                            </FormControl.Label> 
                                            <Input
                                                keyboardType="decimal-pad"
                                                label="number"
                                                placeholder="0.00"
                                                defaultValue={values.shipping}
                                                onChangeText={handleChange('shipping')}
                                            />

                                            {errors.shipping  ? 
                                                <FormError error={errors.shipping} />
                                            : null}
                                        </FormControl>
                                    </HStack>

                                    {/* Purchase Date Input */}
                                    <FormControl bg="transparent" isRequired isInvalid={errors.purchasedate ? true : false}>
                                        <FormControl.Label  
                                            _text={{
                                                bold: true
                                            }}
                                        >
                                            Purchase Date{' '}
                                        </FormControl.Label> 
                                        
                                        <Input
                                            isRequired
                                            label="text"
                                            placeholder="YYYY-MM-DD"
                                            defaultValue={values.purchasedate}
                                            onChangeText={handleChange('purchasedate')}
                                        />

                                        {errors.purchasedate ? 
                                            <FormError error={errors.purchasedate} />
                                        : null}
                                    </FormControl>
                                </VStack>
                                    
                                {/* Signin button */}
                                <Button
                                    size="md"
                                    _text={{
                                        fontSize: "sm",
                                        fontWeight: "medium",
                                    }}
                                    _loading={{
                                        _text: {
                                            color: "white"
                                        }
                                    }}
                                    _disabled={{
                                        _light: { 
                                            background: "coolGray.300",
                                            color: "gray.300"                    
                                        },
                                        _dark: { 
                                            background: "coolGray.700",
                                            color: "gray.100"                    
                                        },
                                    }}
                                    py="3"
                                    onPress={() => handleSubmit()}
                                    background="primary.600"
                                    isLoadingText="Create item..."
                                    isLoading={formLoader}
                                    spinnerPlacement="end"
                                    isDisabled={!dirty}
                                >
                                    Create item
                                </Button>
                            </VStack>
                        )}
                    </Formik>
                </VStack>
            </ScrollView>
      </KeyboardAwareScrollView>
    </Stack>
    </>
  );
}