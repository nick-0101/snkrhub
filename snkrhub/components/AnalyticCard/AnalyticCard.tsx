import {
  Text,
  Stack,
  Icon,
  VStack,
  Button,
  PresenceTransition
} from "native-base";
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'; 

// Types
type Props = {
    mainStat: number;
    prefix?: string;
    width?: string;
    subtext: string;
    cardIcon: React.ComponentProps<typeof FontAwesome5 | typeof MaterialIcons>
}

const AnalyticCard = (props: Props) => {
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
                        w={props.width}
                        bg="primary.500"
                    >
                        {props.cardIcon}
                    </Button>

                    {/* Main Stat */}
                    <PresenceTransition 
                        visible={props.mainStat || props.mainStat == 0 ? true : false} 
                        initial={{
                            opacity: 0
                        }} 
                        animate={{
                            opacity: 1,
                            transition: {
                                duration: 250
                            }
                        }}
                    >
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
                            {props.prefix}{props.mainStat}   
                        </Text>
                    </PresenceTransition>
                    

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
                        {props.subtext ? 
                            <>
                                {props.subtext}
                            </>
                            : 
                            null
                        }  
                    </Text>
                </VStack>
            </Stack>
        </>
    )
}

export default AnalyticCard