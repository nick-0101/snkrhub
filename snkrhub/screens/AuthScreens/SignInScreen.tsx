import React, { useState } from "react";
import {
  Button,
  HStack,
  VStack,
  Text,
  Link,
  Input,
  Divider,
  Image,
  useColorModeValue,
  IconButton,
  Icon,
  Center,
  Hidden,
  StatusBar,
  Stack,
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
        py="9"
        _light={{ bg: "gray.100" }}
        _dark={{ bg: "gray.900" }}
        space="3"
        justifyContent="space-between"
        borderTopRightRadius={{ base: "2xl", md: "xl" }}
        borderBottomRightRadius={{ base: "0", md: "xl" }}
        borderTopLeftRadius={{ base: "2xl", md: "0" }}
      >
        <VStack space="7">
            <Text fontSize="lg" fontWeight="normal">
              Sign in to continue!
            </Text>
            <VStack>
                <VStack space="3">
                <VStack space={{ base: "7", md: "4" }}>
                    {/* Email field */}
                    <Input
                    isRequired
                    label="Email"
                    labelColor="#9ca3af"
                    labelBGColor={useColorModeValue("#fff", "#1f2937")}
                    borderRadius="4"
                    defaultValue={text}
                    onChangeText={(txt: any) => setText(txt)}
                    _text={{
                        fontSize: "sm",
                        fontWeight: "medium",
                    }}
                    _dark={{
                        borderColor: "coolGray.700",
                    }}
                    _light={{
                        borderColor: "coolGray.300",
                    }}
                    />

                    {/* Password field */}
                    <Input
                    isRequired
                    type={showPass ? "" : "password"}
                    label="Password"
                    borderRadius="4"
                    labelColor="#9ca3af"
                    labelBGColor={useColorModeValue("#fff", "#1f2937")}
                    defaultValue={pass}
                    onChangeText={(txt: any) => setPass(txt)}
                    InputRightElement={
                        <IconButton
                        variant="unstyled"
                        icon={
                            <Icon
                            size="4"
                            color="coolGray.400"
                            as={Ionicons}
                            name={showPass ? "eye-off" : "eye"}
                            />
                        }
                        onPress={() => {
                            setShowPass(true);
                        }}
                        />
                    }
                    _text={{
                        fontSize: "sm",
                        fontWeight: "medium",
                    }}
                    _dark={{
                        borderColor: "coolGray.700",
                    }}
                    _light={{
                        borderColor: "coolGray.300",
                    }}
                    />
                </VStack>

                <Link
                    ml="auto"
                    _text={{
                    fontSize: "xs",
                    fontWeight: "bold",
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

                {/* Sign In button */}
                <Button
                    mt="5"
                    size="md"
                    borderRadius="4"
                    _text={{
                    fontWeight: "medium",
                    }}
                    _light={{
                    bg: "primary.900",
                    }}
                    _dark={{
                    bg: "primary.700",
                    }}
                    onPress={() => {
                    navigation.navigate("OTP");
                    }}
                >
                    SIGN IN
                </Button>

                <HStack
                    mt="5"
                    space="2"
                    mb={{ base: 6, md: 7 }}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Divider
                    w="30%"
                    _light={{ bg: "coolGray.200" }}
                    _dark={{ bg: "coolGray.700" }}
                    ></Divider>
                    <Text
                    fontWeight="medium"
                    _light={{ color: "coolGray.300" }}
                    _dark={{ color: "coolGray.500" }}
                    >
                    or
                    </Text>
                    <Divider
                    w="30%"
                    _light={{ bg: "coolGray.200" }}
                    _dark={{ bg: "coolGray.700" }}
                    ></Divider>
                </HStack>
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
            _light={{ color: "coolGray.800" }}
            _dark={{ color: "coolGray.400" }}
          >
            Don't have an account?
          </Text>
          {/* Opening Link Tag navigateTo:"SignUp" */}
          <Link
            _text={{
              fontWeight: "bold",
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
