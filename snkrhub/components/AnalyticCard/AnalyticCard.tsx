import {
  Text,
  Stack,
  Icon,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";

// Types


const AnalyticCard = () => {
    return (
        <>
            <Stack 
                direction="row"
                alignItems={'center'}
                _light={{ bg: "gray.100" }}
                _dark={{ bg: "gray.900" }}
                pt="2"
            >
                <Text>AnalyticCard</Text>
            </Stack>
        </>
    )
}

export default AnalyticCard