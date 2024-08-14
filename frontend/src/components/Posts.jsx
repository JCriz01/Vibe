import { Link, useNavigate } from "react-router-dom";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/avatar";
import { Image } from "@chakra-ui/react";
import Interactions from "./Interactions";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { formatDistanceToNowStrict } from "date-fns";
import { DeleteIcon } from "@chakra-ui/icons";
import { domainUrl } from "../../domain_url";
import { useUserStore } from "../store/userStore";
import { useAtomValue } from "jotai";
import userAtom from "../atoms/userAtom";

const Posts = ({ post, postedBy }) => {
  const currentUser = useUserStore((state) => state.user);
  const userToken = useAtomValue(userAtom);
  const [user, setUser] = useState(null);
  const showToast = useShowToast();
  const navigate = useNavigate();

  console.log(currentUser, userToken);
  //fetching user from api
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`${domainUrl}/api/users/profile/${postedBy}`, {
          credentials: "include",
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        const data = await res.json();
        console.log(data);

        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setUser(data);
      } catch (error) {
        showToast("Error", error, "error");
        setUser(null);
      }
    };

    getUser();
  }, [postedBy, showToast]);

  const handleDeletePost = async (Event) => {
    try {
      Event.preventDefault();

      if (!window.confirm("Are you sure you want to delete this post?")) {
        return;
      }
      const res = await fetch(`${domainUrl}/api/posts/${post.id}`, {
        credentials: "include",
        method: "DELETE",
      });
      console.log(res);
      const data = await res.json();

      if (data.error) {
        showToast("Error", data.error, "error");
      }

      showToast("Success", "Post deleted successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  if (!user) return null;

  return (
    <Link to={`/${user.username}/post/${post.id}`}>
      <Flex gap={3} mb={4} py={5}>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar
            size={"md"}
            name={user.name}
            src={user.avatar}
            onClick={(Event) => {
              Event.preventDefault();
              navigate(`/${user.username}`);
            }}
          ></Avatar>
          <Box w={"1px"} h={"full"} bg={"gray.light"} my={2}></Box>
          <Box position={"relative"} w={"full"}>
            {post.replies.length === 0 && (
              <Text textAlign={"center"} fontSize={"xs"}>
                0
              </Text>
            )}
            {post.replies[0] && (
              <Avatar
                size={"xs"}
                name={user.name}
                src={post.replies[0].userProfilePic}
                position={"absolute"}
                top={"0px"}
                left={"15px"}
                padding={"2px"}
              ></Avatar>
            )}

            {post.replies[1] && (
              <Avatar
                size={"xs"}
                name="criz"
                src=""
                position={"absolute"}
                bottom={"0px"}
                right={"-5px"}
                padding={"2px"}
              ></Avatar>
            )}

            {post.replies[2] && (
              <Avatar
                size={"xs"}
                name="criz"
                src=""
                position={"absolute"}
                bottom={"0px"}
                left={"4px"}
                padding={"2px"}
              ></Avatar>
            )}
          </Box>
        </Flex>
        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"} w={"full"}>
            <Flex w={"full"} alignItems={"center"}>
              <Text
                fontSize={"sm"}
                fontWeight={"bold"}
                onClick={(Event) => {
                  Event.preventDefault();
                  navigate(`/${user.username}`);
                }}
              >
                {user?.username}
              </Text>
              <Image src="" w={4} ml={1} />
            </Flex>
            <Flex gap={4} alignItems={"center"}>
              <Text fontSize={"xs"} textAlign={"right"} color={"gray.light"}>
                {formatDistanceToNowStrict(new Date(post.createdAt))} ago
              </Text>

              {currentUser?.id === user.id && (
                <DeleteIcon size={20} onClick={handleDeletePost} />
              )}
            </Flex>
          </Flex>

          <Text fontSize={"sm"}>{post.content}</Text>
          {post.img && (
            <Box
              borderRadius={6}
              overflow={"hiddne"}
              border={"1px solid"}
              borderColor={"gray.light"}
            >
              <Image src={post.image} w={"full"}></Image>
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

          <Flex gap={3} my={1}>
            <Interactions post={post} />
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};

export default Posts;
