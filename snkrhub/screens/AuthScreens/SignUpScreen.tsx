import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
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
  Input,
  FormControl,
  Icon,
  Spinner
} from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from 'formik';

// Validation
import { SignUpValidationSchema } from "./Schemas/SignUpSchema";

// Types
import { RootTabScreenProps } from '../../types';
import { Ionicons } from "@expo/vector-icons";

const SignUpForm = ({ navigation }: any) => {
  const [inputFocus, setInputFocus] = useState<number | null>(null)
  
  // Form state
  const [showPass, setShowPass] = React.useState(false);
  const [showConfirmPass, setShowConfirmPass] = React.useState(false);

  // useEffect(() => {
  //   if(formik.errors) {
  //     console.log(formik.errors)
  //   }
  // }, [formik])

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
        justifyContent="space-between"
        space="3"
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
              Sign up
            </Text>

            {/* Form */}
            <Formik
              validateOnChange={false}
              validateOnBlur={false}
              validationSchema={SignUpValidationSchema}
              initialValues={{
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
                termsOfService: 'false',
              }}
              onSubmit={(values) =>
                console.log(
                  values.username,
                  values.email,
                  values.password,
                  values.confirmPassword,
                  values.termsOfService
                )
              }
            >
              {({
              handleChange,
              handleSubmit,
              setFieldValue,
              values,
              errors,
              touched,
              isValid,
            }) => (
              <VStack space="8">
                <VStack space={{ base: "3", md: "4" }}>
                  {/* Input Input */}
                  <FormControl>
                    <Input
                      isRequired
                      label="username"
                      placeholder="Username"
                      defaultValue={values.username.trim()}
                      onChangeText={handleChange('username')}
                      onFocus={() => setInputFocus(0)}
                      onBlur={() => setInputFocus(null)}
                      InputLeftElement={
                        <Icon 
                          as={
                            <Ionicons 
                              name="person-outline" 
                            />
                          } 
                          size={5} 
                          ml="4" 
                          color={inputFocus === 0 ? 'primary.500' : 'gray.400'}
                        />
                      }
                    />
                  </FormControl>

                  {/* Email Input */}
                  <FormControl>
                    <Input
                      isRequired
                      label="email"
                      placeholder="Email address"
                      defaultValue={values.email.trim()}
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
                  </FormControl>
                  
                  {/* Password input */}
                  <FormControl>
                    <Input
                      isRequired
                      placeholder={'Password'}
                      type={showPass ? "" : "password"}
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
                  </FormControl>
                  
                  {/* Confirm password input */}
                  <FormControl>
                    <Input
                      isRequired
                      placeholder={'Confirm Password'}
                      type={showConfirmPass ? "" : "password"}
                      label="comfirmPassword"
                      defaultValue={values.confirmPassword.trim()}
                      onChangeText={handleChange('confirmPassword')}
                      onFocus={() => setInputFocus(3)}
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
                            color={inputFocus === 3 ? 'primary.500' : 'gray.400'}
                          />
                        }
                      />
                  </FormControl>
                  </VStack>

                <Checkbox
                  alignItems="flex-start"
                  value={values.termsOfService}
                  colorScheme="primary"
                  accessibilityLabel="Remember me"
                  size="sm" 
                  onChange={(checked) => {
                    setFieldValue('termsOfService', checked.toString())
                  }} 
                >
                  <HStack alignItems="center">
                    <Text 
                      fontSize="sm" 
                      pl="2"
                      _light={{
                        color: "gray.700",
                      }}
                      _dark={{
                        color: "gray.300", 
                      }}
                    >
                      I accept the{" "}
                    </Text>
                    <Link
                      _text={{
                        fontSize: "sm",
                        fontWeight: "semibold",
                        textDecoration: "none",
                        color: 'primary.500'
                      }}
                    >
                      Terms of Use
                    </Link>
                    <Text
                      fontSize="sm" 
                      _light={{
                        color: "gray.700",
                      }}
                      _dark={{
                        color: "gray.300", 
                      }} 
                    > & </Text>

                    <Link
                      _text={{
                        fontSize: "sm",
                        fontWeight: "semibold",
                        textDecoration: "none",
                        color:'primary.500'
                      }}
                    >
                      Privacy Policy
                    </Link>
                  </HStack>
                </Checkbox>
                
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
                  isLoadingText="Sign Up..."
                  isLoading={false}
                  spinnerPlacement="end"
                >
                  Sign Up
                </Button>
              </VStack>
            )}
            </Formik>
          </VStack>
        </VStack>

        <HStack
          mb="4"
          space="1"
          alignItems="center"
          justifyContent="center"
          mt={{ base: "auto", md: "8" }}
        >
          <Text
            fontSize="sm"
            _light={{ color: "gray.800" }}
            _dark={{ color: "gray.400" }}
          >
            Already have an account?
          </Text>

          {/* Opening Link Tag navigateTo:"SignIn" */}
          <Link
            _text={{
              fontSize: "sm",
              fontWeight: "medium",
              textDecoration: "none",
              color: "primary.600",
            }}
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            Sign in
          </Link>
        </HStack>
      </VStack>
    </KeyboardAwareScrollView>
  )
}

export default function SignUpScreen({ navigation }: RootTabScreenProps<'SignUp'>) {
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
          <VStack px="4" mt="20" mb="5">
            <VStack>
              <Text
                fontSize="md"
                fontWeight="normal"
                color={'gray.300'}
              >
                Welcome to
              </Text>
              <Text fontSize="3xl" fontWeight="bold" color="gray.50">
                SnkrHub
              </Text>
            </VStack>
          </VStack>
          <SignUpForm navigation={navigation} />
        </Stack>
      </Center>
    </>
  );
}