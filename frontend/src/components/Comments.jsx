import { useState } from "react";
//import { Link } from "react-router-dom";
import { Flex, Text } from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/avatar";
import { Divider } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Interactions from "./Interactions";

const Comments = ({ reply }) => {
  return (
    <>
      <Flex gap={4} py={2} my={2} w={"full"}>
        <Avatar src={reply.userProfilePic} size={"sm"} />
        <Flex gap={1} w={"full"} flexDirection={"column"}>
          <Flex
            w={"full"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text fontSize={"sm"} fontWeight={"bold"}>
              {reply.user.username}
            </Text>
            {
              <Flex gap={2} alignItems={"center"}>
                <Text fontSize={"sm"} color={"gray.light"}>
                  {reply.createdAt}
                </Text>
                <BsThreeDots />
              </Flex>
            }
          </Flex>
          <Text>{reply.content}</Text>
          {/*<Interactions liked={liked} setLiked={setLiked} /> */}
          {/*<Text fontSize={"sm"} color={"gray.light"}>
            {likes + (liked ? 1 : 0)} likes
  </Text>*/}
        </Flex>
      </Flex>
      <Divider />
    </>
  );
};

export default Comments;
