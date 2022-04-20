import {
  StatusBar,
  Box,
  VStack,
  HStack,
  Stack,
  IconButton,
  Icon,
  Text
} from "native-base";
import { Formik } from 'formik';

// Icons
import { Ionicons } from "@expo/vector-icons";

// Context
import { useAuth } from '../../../context/AuthContext'

// Types
import { RootTabScreenProps } from '../../../types';

export default function AddShoeScreen({ navigation }: RootTabScreenProps<'AddShoe'>) {
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

      <VStack px="6" mt="8" mb="5">
        <VStack>

        </VStack>
      </VStack>
    </Stack>
    </>
  );
}