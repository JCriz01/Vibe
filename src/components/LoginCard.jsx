import { useState, react } from "react";
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
  Spinner,
} from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";

import authScreenAtom from "../atoms/authAtom";
import useShowToast from "../hooks/useShowToast";
import userAtom from "../atoms/userAtom";
export default function SimpleCard() {
  const setAuthScreen = useSetRecoilState(authScreenAtom);

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const showToast = useShowToast();

  const setUser = useSetRecoilState(userAtom);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch("api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      const data = await res.json();

      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }

      localStorage.setItem("user-Vibe", JSON.stringify(data));

      setUser(data);

      showToast("Success", "Successfully logged in", "success");
    } catch (error) {
      showToast("Error", error, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex align={"center"} justify={"center"}>
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
              <Input
                type="text"
                onChange={(Event) =>
                  setInputs({
                    ...inputs,
                    username: Event.target.value,
                  })
                }
                value={inputs.username}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={inputs.password}
                onChange={(Event) =>
                  setInputs({
                    ...inputs,
                    password: Event.target.value,
                  })
                }
              />
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
                onClick={handleLogin}
                isLoading={loading}
                loadingText="Logging in"
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
