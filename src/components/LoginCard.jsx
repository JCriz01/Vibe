import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Link,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";

import authScreenAtom from "../atoms/authAtom";

export default function SimpleCard() {
  const setAuthScreen = useSetRecoilState(authScreenAtom);

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to have fun with the gang✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.dark")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Text align={"center"}>
                  Don&apos;t have an account eh?{" "}
                  <Link
                    color={"blue.400"}
                    onClick={() => setAuthScreen("signup")}
                  >
                    Sign Up
                  </Link>
                </Text>
              </Stack>
              <Button
                bg={useColorModeValue("gray.600", "gray.700")}
                color={"white"}
                _hover={{
                  bg: useColorModeValue("gray.700", "gray.800"),
                }}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
