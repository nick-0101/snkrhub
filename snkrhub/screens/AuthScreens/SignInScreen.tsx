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

// Types
import { RootTabScreenProps } from '../../types';

export function SignInForm({ navigation }: any) {
  // const router = useRouter(); //use incase of Nextjs
  const [text, setText] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = React.useState(false);

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
            <VStack space="5">
                <VStack space={{ base: "3", md: "4" }}>
                    {/* Email Input */}
                    <FormControl>
                        <FormControl.Label 
                            _text={{
                            fontSize: "xs",
                            color: "gray.400",
                            fontWeight: "medium"
                            }}
                        >
                            Email
                        </FormControl.Label>
                        <Input
                            isRequired
                            label="Email"
                            placeholder="your@email.com"
                            defaultValue={text}
                            onChangeText={(txt: any) => setText(txt)}
                        />
                    </FormControl>
                    
                    {/* Password input */}
                    <FormControl>
                        <FormControl.Label 
                            _text={{
                            fontSize: "xs",
                            color: "gray.400",
                            fontWeight: "medium"
                            }}
                        >
                            Password
                        </FormControl.Label>

                        <Input
                            isRequired
                            placeholder={'••••••••'}
                            type={showPass ? "" : "password"}
                            label="Password"     
                            defaultValue={pass}
                            onChangeText={(txt: any) => setPass(txt)}
                        />
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
                    _text={{
                        fontSize: "sm",
                        fontWeight: "medium",
                    }}
                    background="primary.600"
                    onPress={() => {
                        navigation.navigate("SignUp");
                    }}
                >
                    Sign In
                </Button>
            </VStack>
          </VStack>
        </VStack>

        <HStack
            mb="4"
            space="1"
            safeAreaBottom
            alignItems="center"
            justifyContent="center"
            mt={{ base: "auto", md: "8" }}
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
            <VStack px="4" mt="20" mb="5">
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
