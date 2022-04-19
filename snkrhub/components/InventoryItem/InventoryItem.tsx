import {
  Text,
  Stack,
  Icon,
  VStack,
  HStack,
  Box,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";

// Types
type Props = {
    name: string;
    size: number;
    category: string;
}

const InventoryItem = (props: Props) => {
    return (
        <>
            <Box display="flex" flexDirection="row">
                <HStack>
                    {/* Image */}
                    <Box 
                        alignSelf="center" 
                        _light={{ bg: "gray.200" }}
                        _dark={{ bg: "gray.800" }} 
                        p="8"
                        borderRadius={6}
                    >
                    </Box>

                    {/* Title */}
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

                {/* Category */}
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
                        Unlisted
                    </Text>
                </HStack>
            </Box>

        </>
    )
}

export default InventoryItem