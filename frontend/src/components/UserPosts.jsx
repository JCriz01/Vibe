import { Link } from "react-router-dom";
import { Flex, Box, Text } from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/avatar";
import { Image } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Interactions from "./Interactions";
import { useState } from "react";

const UserPosts = ({ likes, replies, postImg, postTitle }) => {
  const [liked, setLiked] = useState(false);

  return (
    <Link to={"/Crizpy/post/1"}>
      <Flex gap={3} mb={4} py={5}>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar size={"md"} name="Crizpy" src=""></Avatar>
          <Box w={"1px"} h={"full"} bg={"gray.light"} my={2}></Box>
          <Box position={"relative"} w={"full"}>
            <Avatar
              size={"xs"}
              name="criz"
              src=""
              position={"absolute"}
              top={"0px"}
              left={"15px"}
              padding={"2px"}
            ></Avatar>
            <Avatar
              size={"xs"}
              name="criz"
              src=""
              position={"absolute"}
              bottom={"0px"}
              right={"-5px"}
              padding={"2px"}
            ></Avatar>
            <Avatar
              size={"xs"}
              name="criz"
              src=""
              position={"absolute"}
              bottom={"0px"}
              left={"4px"}
              padding={"2px"}
            ></Avatar>
          </Box>
        </Flex>
        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"} w={"full"}>
            <Flex w={"full"} alignItems={"center"}>
              <Text fontSize={"sm"} fontWeight={"bold"}>
                Crizpy
              </Text>
              <Image src="" w={4} ml={1} />
            </Flex>
            <Flex gap={4} alignItems={"center"}>
              <Text fontSize={"sm"} color={"grey.light"}>
                1d
              </Text>
              <BsThreeDots />
            </Flex>
          </Flex>

          <Text fontSize={"sm"}>{postTitle}</Text>
          {postImg && (
            <Box
              borderRadius={6}
              overflow={"hiddne"}
              border={"1px solid"}
              borderColor={"gray.light"}
            >
              <Image src={postImg} w={"full"}></Image>
            </Box>
          )}
          <Box
            borderRadius={6}
            overflow={"hidden"}
            border={"1px solid "}
            borderColor={"gray.light"}
          >
            <Image src="" w={"full"}></Image>
          </Box>

          <Flex gap={3} my={1}></Flex>

          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"sm"} color={"gray.light"}>
              {replies} replies
            </Text>
            <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
            <Text fontSize={"sm"} color={"gray.light"}>
              {likes} likes
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};

export default UserPosts;
