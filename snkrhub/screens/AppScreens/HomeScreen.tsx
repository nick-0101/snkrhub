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
} from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// Context
import { useAuth } from '../../context/AuthContext'

// Types
import { RootTabScreenProps } from '../../types';

export function AnalyticsScreen() {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
      style={{ flex: 1 }}
    >
      <VStack 
        _light={{ bg: "gray.100" }}
        _dark={{ bg: "gray.900" }}
      >
        <VStack
          px="6"
          py="9"
          space="2"
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
            <Text fontSize="3xl" fontWeight="bold" color="gray.50">
              1202.00
            </Text>

            <Box 
              alignSelf="center" 
              ml="auto" 
              borderRadius={9}
              px="3"
              py="1.5"
              style={{backgroundColor: 'rgba(191, 219, 254, 0.3)'}}
            >
              <Text fontSize="lg" color="blue.50" fontWeight="bold" opacity={100}>
                + 2.32%
              </Text>
            </Box>
          </HStack>

          {/* Info */}
          <Text color="blue.200">25 items on April 17, 2022</Text>
        </VStack>
      </VStack>

      <VStack
        px="6"
        py="5"
        _light={{ bg: "gray.100" }}
        _dark={{ bg: "gray.900" }}
        space="3"
        justifyContent="space-between"
      >      
        <VStack space="7">
          <VStack>
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
            >
              Sign up
              assss
              s
              s
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum commodi optio, eligendi sint ut consequatur earum dolores cum itaque. Incidunt reiciendis deleniti molestias asperiores, et repudiandae quisquam architecto unde eveniet quia suscipit numquam nihil alias placeat nulla sapiente minima odio maiores, non soluta debitis quidem laboriosam nam quas? Rerum itaque quod odio architecto quae dolorum, magni distinctio consequuntur nulla odit voluptas ducimus aut deleniti reprehenderit pariatur corporis dignissimos sit atque fugit minima officia? Esse sint nemo laborum doloremque blanditiis iste et excepturi ducimus alias iure praesentium officia iusto suscipit voluptates animi id facilis dignissimos nesciunt minus sapiente, nobis tempore inventore quia. Nihil ratione deserunt odit mollitia debitis molestias, natus eligendi alias! Praesentium, enim. Hic atque est neque, rem ex eum soluta exercitationem, obcaecati dolore nesciunt libero placeat accusantium facilis omnis odit adipisci, sed unde itaque autem blanditiis voluptas iure possimus. Repudiandae iste aut, voluptate debitis assumenda, amet rerum non quisquam nesciunt iure veniam labore? Iste sunt iusto pariatur odit ducimus minima est totam? Aliquam quos exercitationem fuga dolores deleniti odit consequatur quo, quibusdam ratione adipisci, fugiat nostrum placeat repudiandae natus excepturi sequi reiciendis dolorem? Inventore exercitationem, vero sint laudantium fugit omnis ex animi aperiam! Dicta dolorum consequuntur ea hic vero maxime qui quae doloremque odit animi similique numquam, possimus, praesentium magnam, voluptatum minus non sit officiis? Libero blanditiis sunt quae nostrum inventore aut doloremque repellat maiores commodi voluptatem minima quidem sapiente ex eos nihil, autem consequuntur nisi voluptatum nemo adipisci asperiores enim natus iure? Laborum nulla reprehenderit quidem deleniti vero. Recusandae fugit a sit quo blanditiis rem voluptatem, accusantium dolores tempore sint qui ducimus dicta, ad fugiat nesciunt id iure in unde facere harum placeat, aliquam quis? Asperiores laborum corrupti cumque, natus esse eos voluptatem enim quis nihil facere vero temporibus sit veniam nesciunt dicta, harum beatae. Maxime amet itaque ex temporibus corporis. Iure qui error illum a optio labore tenetur temporibus velit delectus, commodi hic harum id ullam voluptatum suscipit fugit pariatur nulla unde repudiandae sapiente asperiores possimus officiis minima. Minima aliquam consequuntur corrupti optio, magnam praesentium, quam perspiciatis reprehenderit officiis omnis neque deleniti aperiam, repellat ipsam vero commodi id? Atque ab quaerat unde libero quidem nisi ipsam asperiores enim optio dignissimos similique earum, tempora doloribus eveniet ipsum quos at veniam rerum reprehenderit veritatis sunt ratione molestias dolor exercitationem! Officiis, facilis. Consequatur non sequi nam similique sint omnis, soluta minus dolor hic laboriosam, praesentium natus quasi laudantium optio officia. Nemo mollitia nihil commodi corrupti? Facere exercitationem officiis eos quis fugiat a possimus soluta blanditiis. Rem perspiciatis doloribus reiciendis, repudiandae nesciunt perferendis, magni porro saepe unde quas nam voluptate cum ipsum praesentium impedit eaque qui. Odit molestiae nihil neque natus assumenda repudiandae dignissimos cum non eos, temporibus quo suscipit sequi pariatur ipsa ullam odio enim ea, quod error voluptatibus aperiam. Magnam explicabo eveniet blanditiis, doloremque dolorem quibusdam neque possimus perferendis quia laudantium, veritatis nisi voluptatem ullam at incidunt recusandae modi. Praesentium fugiat debitis a quasi consectetur inventore ab, ipsam nesciunt voluptates accusantium obcaecati dicta tempore aliquid odio quis at ad!
            </Link>
        </HStack>
      </VStack>
    </KeyboardAwareScrollView>
  )
}

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  // Auth state
  const { signOutUser, getUserToken } = useAuth();

  return (
    // <Center
    //   my="auto"
    //   _light={{ bg: "gray.100" }}
    //   _dark={{ bg: "gray.900" }}
    //   flex="1"
    // >
    //   <Stack
    //     flexDirection={{ base: "column", md: "row" }}
    //     w="100%"
    //     maxW={{ md: "1016px" }}
    //     flex={{ base: "1", md: "none" }}
    //   >
    //     <VStack px="4" mt="20" mb="5">
    //       <VStack>
    //         <Button onPress={() => getUserToken()}>Get token</Button>
    //         <Button onPress={() => signOutUser()}>Sign out</Button>
    //       </VStack>
    //     </VStack>
    //   </Stack>
    // </Center>
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
          <AnalyticsScreen />
        </Stack>
      </Center>
    </>
  );
}