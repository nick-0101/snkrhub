import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Image,
  HStack,
  VStack,
  Text,
  Link,
  Divider,
  Icon,
  IconButton,
  useColorModeValue,
  Pressable,
  Hidden,
  Center,
  StatusBar,
  Box,
  Stack,
  Input,
  FormControl
} from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// Types


const SignUpForm = (props: any) => {
  const [text, setText] = useState("");
  const [pass, setPass] = useState("");
  const [confirm_pass, setConfirmPass] = useState("");
  const [showPass, setShowPass] = React.useState(false);
  const [showConfirmPass, setShowConfirmPass] = React.useState(false);

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
        borderTopRightRadius={{ base: "2xl", md: "xl" }}
        borderBottomRightRadius={{ base: "0", md: "xl" }}
        borderTopLeftRadius={{ base: "2xl", md: "0" }}
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
            <VStack space="8">
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
                    labelColor="#9ca3af"
                    labelBGColor={useColorModeValue("#fff", "#1f2937")}
                    defaultValue={text}
                    onChangeText={(txt: any) => setText(txt)}
                    _text={{
                      fontSize: "md",
                      fontWeight: "medium",
                    }}
                    _light={{
                      borderColor: "gray.300",
                    }}
                    _dark={{
                      borderColor: "gray.800", 
                      background: '#262A31'
                    }}
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
                    placeholder={'Password'}
                    type={showPass ? "" : "password"}
                    label="Password"
                    labelColor="#9ca3af"
                    labelBGColor={useColorModeValue("#fff", "#1f2937")}
                    defaultValue={pass}
                    onChangeText={(txt: any) => setPass(txt)}
                    // InputRightElement={
                    //   <IconButton
                    //     variant="unstyled"
                    //     icon={
                    //       <Icon
                    //         size="4"
                    //         color="gray.400"
                    //         as={Entypo}
                    //         name={showPass ? "eye-with-line" : "eye"}
                    //       />
                    //     }
                    //     onPress={() => {
                    //       setShowPass(!showPass);
                    //     }}
                    //   />
                    // }
                    _text={{
                      fontSize: "md",
                      fontWeight: "medium",
                    }}
                    _light={{
                      borderColor: "gray.300",
                    }}
                    _dark={{
                      borderColor: "gray.800", 
                      background: '#262A31'
                    }}
                  />
                </FormControl>
                
                {/* Confirm password input */}
                <FormControl>
                  <FormControl.Label 
                    _text={{
                      fontSize: "xs",
                      color: "gray.400",
                      fontWeight: "medium"
                    }}
                  >
                    Confirm password
                  </FormControl.Label>
                  <Input
                    isRequired
                    placeholder={'Confirm Password'}
                    type={showConfirmPass ? "" : "password"}
                    label="Confirm Password"
                    labelColor="#9ca3af"
                    labelBGColor={useColorModeValue("#fff", "#1f2937")}
                    defaultValue={confirm_pass}
                    onChangeText={(txt: any) => setConfirmPass(txt)}
                    // InputRightElement={
                    //   <IconButton
                    //     variant="unstyled"
                    //     icon={
                    //       <Icon
                    //         size="4"
                    //         color="gray.400"
                    //         as={Entypo}
                    //         name={showConfirmPass ? "eye-with-line" : "eye"}
                    //       />
                    //     }
                    //     onPress={() => {
                    //       setShowConfirmPass(!showConfirmPass);
                    //     }}
                    //   />
                    // }
                    _text={{
                      fontSize: "md",
                      fontWeight: "medium",
                    }}
                    _light={{
                      borderColor: "gray.300",
                    }}
                    _dark={{
                      borderColor: "gray.800", 
                      background: '#262A31'
                    }}
                  />
                </FormControl>
              </VStack>

              <Checkbox
                alignItems="flex-start"
                defaultIsChecked
                value="demo"
                colorScheme="primary"
                accessibilityLabel="Remember me"
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
                  <Text fontSize="sm"> & </Text>

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
                background="primary.600"
                onPress={() => {
                  props.navigation.navigate("OTP");
                }}
              >
                Sign Up
              </Button>
            </VStack>
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
            _light={{ color: "gray.700" }}
            _dark={{ color: "gray.300" }}
          >
            Already have an account?
          </Text>

          {/* Opening Link Tag navigateTo:"SignIn" */}
          <Link
            _text={{
              fontSize: "sm",
              fontWeight: "bold",
              textDecoration: "none",
              color: "primary.600",
            }}
            onPress={() => {
              props.navigation.navigate("SignIn");
            }}
          >
            Sign in
          </Link>
          {/* Closing Link Tag */}
        </HStack>
      </VStack>
    </KeyboardAwareScrollView>
  )
}

export default function SignUpScreen(props: any) {
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
          <SignUpForm props={props} />
        </Stack>
      </Center>
    </>
  );
}