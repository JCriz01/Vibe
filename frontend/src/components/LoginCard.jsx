//not using?

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
} from "@chakra-ui/react";
import { useAtom } from "jotai";
//import { useSetRecoilState } from "recoil";
import authScreenAtom from "../atoms/authAtom";
import useShowToast from "../hooks/useShowToast";
import userAtom from "../atoms/userAtom";
//import { useUserStore2 } from "../store/userStore";
import { domainUrl } from "../../domain_url";
import { useUserStore } from "../store/userStore";
import { useNavigate } from "react-router-dom";

import { Card, CardContent, CardFooter } from "@/components/ui/card";

//TODO: Fix jotai state not updating immediately.
export default function SimpleCard() {
  const navigate = useNavigate();
  const [, setAuthScreen] = useAtom(authScreenAtom);
  const [userToken, setUserToken] = useAtom(userAtom);
  const setUser = useUserStore((state) => state.updateAccount);
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const showToast = useShowToast();

  console.log("loading login card");

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${domainUrl}/api/users/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();
      if (data.message) {
        showToast("Error", data.message, "error");
        return;
      }

      if (data.token) {
        localStorage.setItem("user-token", JSON.stringify(data.token));
        setUserToken(data.token);
        console.log("setting user token, value is now: ", userToken);

        setUser(data.user);
        showToast("Success", "Successfully logged in", "success");
        navigate("/");
      }
    } catch (error) {
      console.log("error from login", error);
      showToast("Error", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className=" lg:w-96 ">
      <CardContent>
        <div className=" items-center">
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to have fun with the gang✌️
          </Text>
        </div>
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
      </CardContent>
    </Card>
  );
}
