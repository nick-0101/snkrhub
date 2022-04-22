import { Platform, LayoutAnimation, UIManager } from 'react-native';
import {
  Text,
  VStack,
  HStack,
  Box,
  Icon,
  Avatar
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons'; 

// Types
type Props = {
    name: string;
    size: number;
    price: number;
    index: number;
}

const InventoryItem = (props: Props) => {
    LayoutAnimation.configureNext({  
        duration: 150,
        create: {
            property: LayoutAnimation.Properties.opacity,
            type: LayoutAnimation.Types.linear,
        },
        update: {
            property: LayoutAnimation.Properties.opacity,
            type: LayoutAnimation.Types.linear,
        },
        delete: {
            property: LayoutAnimation.Properties.opacity,
            type: LayoutAnimation.Types.linear,
        },
    });

    return (
        <>
            <HStack py="3.5" space={2} alignItems="center">
                <HStack>
                    {/* Icon */}
                    <Box 
                        alignSelf="center" 
                        _light={{ bg: "gray.200" }}
                        _dark={{ bg: "gray.800" }} 
                        p="4"
                        borderRadius={6}
                    >
                        <Icon 
                            size={6}
                            _light={{ color: "gray.400" }}
                            _dark={{ color: "gray.600" }} 
                            name="box"
                            as={FontAwesome5}
                        />
                    </Box>

                    {/* Title & size */}
                    <VStack 
                        mx="3"
                        my="auto"
                        justifyContent={'flex-start'}
                        w="60%"  
                    >
                        <Text            
                            isTruncated                 
                            flexWrap={"wrap"}
                            fontSize="md"
                            fontWeight="medium"
                            _light={{
                                color: "gray.700",
                            }}
                            _dark={{
                                color: "gray.300", 
                            }}
                        >
                            {props.name}
                        </Text>
                        <Text
                            fontWeight={'bold'}
                            color={"gray.500"}
                            fontSize="sm"
                        >
                            {props.size}
                        </Text>
                    </VStack>
                </HStack>
                
                {/* Price */}
                <HStack
                    alignItems={'center'}
                    ml="auto"
                    pl="3"
                >
                    <Text
                        fontWeight={'bold'}
                        _light={{
                            color: "gray.600",
                        }}
                        _dark={{
                            color: "gray.400", 
                        }}
                    >
                        ${props.price}
                    </Text>
                </HStack>
            </HStack> 
        </>
    )
}

export default InventoryItem