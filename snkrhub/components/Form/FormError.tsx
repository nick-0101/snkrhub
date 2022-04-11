import {
  Text,
  Stack,
  Icon,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";

// Types
type Props = {
    error: string
}

const FormError = ({ error }: Props) => {
    return (
        <>
            <Stack 
                direction="row"
                alignItems={'center'}
                _light={{ bg: "gray.100" }}
                _dark={{ bg: "gray.900" }}
                pt="2"
            >
            <Icon 
                as={
                    <Ionicons 
                        name="alert-circle" 
                />
                } 
                size={5} 
                mr="2" 
                _light={{
                    color: "red.700",
                }}
                _dark={{
                    color: "red.300", 
                }} 
            />
                <Text 
                    _light={{
                        color: "red.700",
                    }}
                    _dark={{
                        color: "red.300", 
                    }} 
                >
                    {error}
                </Text>
            </Stack>
        </>
    )
}

export default FormError