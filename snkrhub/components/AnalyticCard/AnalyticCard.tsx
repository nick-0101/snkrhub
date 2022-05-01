import {
  Text,
  Stack,
  Icon,
  VStack,
  Button
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons'; 

// Types


const AnalyticCard = () => {
    return (
        <>
            <Stack 
                direction="row"
                alignItems={'center'}
                _light={{ bg: "gray.200" }}
                _dark={{ bg: "gray.800" }}
                mt="2"
                p="5"
                w="48%"
                borderRadius={6}
            >   
                <VStack>
                    {/* Icon */}
                    <Button
                        borderRadius="50"
                        px="0"
                        w="30%"
                        bg="primary.500"
                    >
                        <Icon 
                            as={FontAwesome5} 
                            name="chart-pie" 
                            size="3"
                            color="white"
                        />
                    </Button>

                    {/* Main Stat */}
                    <Text
                        pt="3"
                        fontSize="lg"
                        fontWeight="bold"
                        _light={{
                            color: "gray.700",
                        }}
                        _dark={{
                            color: "gray.300", 
                        }}
                    >
                        $25012
                    </Text>

                    {/* Subtext */}
                    <Text
                        fontSize="xs"
                        _light={{
                            color: "gray.700",
                        }}
                        _dark={{
                            color: "gray.300", 
                        }}
                    >
                        Total item spend
                    </Text>
                </VStack>
            </Stack>
        </>
    )
}

export default AnalyticCard