import { SetStateAction, useState } from 'react';
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
  Pressable
} from "native-base";

// Packages
import DateTimePicker from '@react-native-community/datetimepicker';
import { Formik } from 'formik';
import { Ionicons } from "@expo/vector-icons";
import { AddShoeSchema } from './Schemas/AddShoeSchema';

// Components
import { FormError } from '../../../components'

// Context
import { useAuth } from '../../../context/AuthContext'

// Types
import { RootTabScreenProps } from '../../../types';

export default function AddShoeScreen({ navigation }: RootTabScreenProps<'AddShoe'>) {
  // Form state
  const [formLoader, setFormLoading] = useState(false)

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

      <ScrollView px="6"> 
        <VStack py="5">
            {/* Form pt="5" pb="5" mt="8" mb="5"*/}
            <Formik
                validateOnChange={false}
                validateOnBlur={false}
                validationSchema={AddShoeSchema}
                initialValues={{
                    name: '',
                    styleId: '',
                    brand: '',
                    colour: '',
                    condition: '',
                    shoeSize: '',
                    purchasePrice: '',
                    tax: '',
                    shipping: '',
                    purchaseDate: '',
                    orderNumber: ''
                }}
                onSubmit={async(values) => {
                    console.log(values)
                }}
            >
                {({
                    handleChange,
                    handleSubmit,
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
                                    isInvalid={errors.styleId ? true : false}
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
                                        defaultValue={values.styleId}
                                        onChangeText={handleChange('styleId')}
                                    />

                                    {errors.styleId  ? 
                                        <FormError error={errors.styleId} />
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
                                    isInvalid={errors.shoeSize ? true : false}
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
                                        label="text"
                                        placeholder="11"
                                        defaultValue={values.shoeSize}
                                        onChangeText={handleChange('shoeSize')}
                                    />

                                    {errors.shoeSize ? 
                                        <FormError error={errors.shoeSize} />
                                    : null}
                                </FormControl>

                                {/* Purchase Price Input */}
                                <FormControl 
                                    bg="transparent" 
                                    isRequired
                                    isInvalid={errors.purchasePrice ? true : false}
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
                                        label="text"
                                        placeholder="270"
                                        defaultValue={values.purchasePrice}
                                        onChangeText={handleChange('purchasePrice')}
                                    />

                                    {errors.purchasePrice ? 
                                        <FormError error={errors.purchasePrice} />
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
                                        label="text"
                                        placeholder="0.00"
                                        defaultValue={values.tax}
                                        onChangeText={handleChange('tax')}
                                    />

                                    {errors.tax  ? 
                                        <FormError error={errors.tax} />
                                    : null}
                                </FormControl>

                                {/* Condition Input */}
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
                                        label="text"
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
                            <FormControl bg="transparent" isRequired isInvalid={errors.purchaseDate ? true : false}>
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
                                    placeholder="Nike Dunk Low"
                                    defaultValue={values.purchaseDate}
                                    onChangeText={handleChange('purchaseDate')}
                                />

                                {errors.purchaseDate ? 
                                    <FormError error={errors.purchaseDate} />
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
                            onPress={() => handleSubmit()}
                            background="primary.600"
                            isLoadingText="Creating item..."
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
    </Stack>
    </>
  );
}