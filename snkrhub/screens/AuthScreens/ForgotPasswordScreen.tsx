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
import { ForgotPasswordValidationSchema } from "./Schemas/ForgotPasswordSchema";

// Components
import { FormError } from '../../components'

// Types
import { RootTabScreenProps } from '../../types';

export function ForgotPasswordForm({ navigation }: any) {
  const { forgotPassword } = useAuth()
    
  // Form state
  const [formLoader, setFormLoading] = useState(false)
  const [inputFocus, setInputFocus] = useState<number | null>(null)
  const [emailError, setEmailError] = useState('')


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
        _light={{ bg: "#F4F5F7" }}
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
              Forgot your password?
            </Text>

            {/* Form */}
            <Formik
              validateOnChange={false}
              validateOnBlur={false}
              validationSchema={ForgotPasswordValidationSchema}
              initialValues={{
                email: '',
              }}
              onSubmit={async(values) => {
                // Show button loading
                setFormLoading(true)

                // Send email
                await forgotPassword(values.email)
                .catch((err: any) => {
                  setEmailError(err.message);
                  
                  // Hide form loader
                  setFormLoading(false)
                })

                // Hidee button loading
                setFormLoading(false)
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

                    {errors.email || emailError ? 
                      <FormError error={errors.email || emailError} />
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
                  isLoadingText="Reset Password..."
                  isLoading={formLoader}
                  spinnerPlacement="end"
                  isDisabled={!dirty}
                  py="3"
                >
                  Reset Password
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
            <Text>
              Nevermind,
            </Text>
            
            {/* Opening Link Tag navigateTo:"SignUp" */}
            <Link
              _text={{
                fontSize: "sm",
                fontWeight: "medium",
                textDecoration: "none",
              }}
              _light={{
                _text: {
                  color: "primary.600",
                },
              }}
              _dark={{
                _text: {
                  color: "primary.500",
                },
              }}
              onPress={() => {
                navigation.navigate("SignIn");
              }}
            >
              go back
            </Link>
        </HStack>
      </VStack>
    </KeyboardAwareScrollView>
  );
}
export default function ForgotPasswordScreen({ navigation }: RootTabScreenProps<'ForgotPassword'>) {
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
                navigation.navigate("SignIn");
              }}
            >
              <IconButton
                variant="unstyled"
                pl="0"
                onPress={() => {
                  navigation.navigate("SignIn");
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
                Sign in
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

          <ForgotPasswordForm navigation={navigation} />
        </Stack>
      </Center>
    </>
  );
}
