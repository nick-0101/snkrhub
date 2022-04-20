import {
  Center,
  StatusBar,
  Box,
  Stack,
  Text
} from "native-base";

// Context
import { useAuth } from '../../../context/AuthContext'

// Types
import { RootTabScreenProps } from '../../../types';

export default function AddShoeScreen({ navigation }: RootTabScreenProps<'AddShoeScreen'>) {
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
          flex={{ base: "1" }}
        >            
          <Text>Add shoe</Text>
        </Stack>
      </Center>
    </>
  );
}