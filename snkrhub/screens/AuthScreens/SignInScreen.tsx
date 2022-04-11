import React, { useState } from "react";
import {
  Button,
  HStack,
  VStack,
  Text,
  Link,
  Input,
  FormControl,
  IconButton,
  Icon,
  Center,
  Stack,
  StatusBar,
  Box,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from 'formik';
import { useAuth } from '../../context/AuthContext'

// Validation
import { SignInValidationSchema } from "./Schemas/SignInSchema";

// Components
import { FormError } from '../../components'

// Types
import { RootTabScreenProps } from '../../types';

export function SignInForm({ navigation }: any) {
  const { signIn } = useAuth()
  const [inputFocus, setInputFocus] = useState<number | null>(null)
    
  // Form state
  const [formLoader, setFormLoading] = useState(false)

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
      style={{ flex: 1 }}
    >
      <VStack
        flex="1"
        px="6"
        py="5"
        _light={{ bg: "gray.100" }}
        _dark={{ bg: "gray.900" }}
        space="3"
        justifyContent="space-between"
        borderTopRightRadius={{ base: "3xl", }}
        borderBottomRightRadius={{ base: "0", }}
        borderTopLeftRadius={{ base: "3xl" }}
      >
        <VStack space="7">
          <VStack>
            {/* Form title */}
            <Text
              pb="5"
              fontSize="lg"
              fontWeight="bold"

              _light={{
                color: "gray.700",
              }}
              _dark={{
                color: "gray.300", 
              }}
            >
              Sign in
            </Text>

            {/* Form */}
            <Formik
              validateOnChange={false}
              validateOnBlur={false}
              validationSchema={SignInValidationSchema}
              initialValues={{
                email: '',
                password: '',
              }}
              onSubmit={async(values) => {
                // Show button loading
                setFormLoading(true)

                // Sign up user
                await signIn(values.email, values.password)
                .catch(err => {
                  console.log(JSON.stringify(err))
                  
                  // Hide form loader
                  setFormLoading(false)
                })
              }}
            >
            {({
              handleChange,
              handleSubmit,
              setFieldValue,
              values,
              errors
            }) => (
                <VStack space="5">
                    <VStack space={{ base: "3", md: "4" }}>
                        {/* Email Input */}
                        <FormControl isInvalid={errors.email ? true : false}> 
                            <Input
                            isRequired
                            label="email"
                            placeholder="Email address"
                            defaultValue={values.email}
                            onChangeText={handleChange('email')}
                            onFocus={() => setInputFocus(1)}
                            onBlur={() => setInputFocus(null)}
                            InputLeftElement={
                                <Icon 
                                as={
                                    <Ionicons 
                                    name="mail-outline" 
                                    />
                                } 
                                size={5} 
                                ml="4" 
                                color={inputFocus === 1 ? 'primary.500' : 'gray.400'}
                                />
                            }
                            />

                            {errors.email ? 
                                <FormError error={errors.email} />
                            : null}
                        </FormControl>
                        
                        {/* Password input */}
                        <FormControl isInvalid={errors.password ? true : false}>
                            <Input
                            isRequired
                            placeholder={'Password'}
                            type={"password"}
                            label="Password"     
                            defaultValue={values.password.trim()}
                            onChangeText={handleChange('password')}
                            onFocus={() => setInputFocus(2)}
                            onBlur={() => setInputFocus(null)}
                            InputLeftElement={
                                <Icon 
                                as={
                                    <Ionicons 
                                    name="lock-closed-outline" 
                                    />
                                } 
                                size={5} 
                                ml="4" 
                                color={inputFocus === 2 ? 'primary.500' : 'gray.400'}
                                />
                            }
                            />

                            {errors.password ? 
                            <FormError error={errors.password} />
                            : null}
                        </FormControl>
                
                    </VStack>
                                
                    {/* Forgot password link */}
                    <Link
                        ml="auto"
                        _text={{
                            fontSize: "sm",
                            fontWeight: "normal",
                            textDecoration: "none",
                        }}
                        _light={{
                            _text: {
                                color: "primary.900",
                            },
                        }}
                        _dark={{
                            _text: {
                                color: "primary.500",
                            },
                        }}
                    >
                        Forgot password?
                    </Link>

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
                        onPress={() => handleSubmit()}
                        background="primary.600"
                        isLoadingText="Sign in..."
                        isLoading={formLoader}
                        spinnerPlacement="end"
                    >
                        Sign in
                    </Button>
                </VStack>
            )}
            </Formik>
          </VStack>
        </VStack>

        <HStack
            mb="2"
            space="1"
            safeAreaBottom
            alignItems="center"
            justifyContent="center"
            mt={{ base: "auto", md: "12" }}
        >
            <Text
                _light={{ color: "gray.800" }}
                _dark={{ color: "gray.400" }}
            >
                Don't have an account?
            </Text>
            
            {/* Opening Link Tag navigateTo:"SignUp" */}
            <Link
               _text={{
                    fontSize: "sm",
                    fontWeight: "medium",
                    textDecoration: "none",
                    color: "primary.600",
                }}
                onPress={() => {
                    navigation.navigate("SignUp");
                }}
            >
                Sign up
            </Link>
        </HStack>
      </VStack>
    </KeyboardAwareScrollView>
  );
}
export default function SignIn({ navigation }: RootTabScreenProps<'SignIn'>) {
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
            maxW={{ md: "1016px" }}
            flex={{ base: "1", md: "none" }}
        >
            <HStack px="2">
                <Link
                    alignItems="center"
                    onPress={() => {
                        navigation.navigate("SignUp");
                    }}
                >
                    <IconButton
                        variant="unstyled"
                        pl="0"
                        onPress={() => {
                            navigation.navigate("SignUp");
                        }}
                        icon={
                            <Icon
                                size="5"
                                as={Ionicons}
                                name="chevron-back"
                                color="gray.100"
                            />
                        }
                    />
                    
                    <Text color="gray.50" fontSize="md">
                        Sign up
                    </Text>
                </Link>
            </HStack>
            
            <VStack px="4" mt="16" mb="5">
                <Text
                    fontSize="md"
                    fontWeight="normal"
                    color={'gray.300'}
                >
                    Welcome back to
                </Text>
                <Text fontSize="3xl" fontWeight="bold" color="gray.50">
                    SnkrHub
                </Text>
            </VStack>

            <SignInForm navigation={navigation} />
        </Stack>
      </Center>
    </>
  );
}
