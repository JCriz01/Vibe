import { useState } from "react";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "../hooks/useShowToast";
import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  Input,
  ModalFooter,
  Button,
  useDisclosure,
  Box,
  Text,
} from "@chakra-ui/react";
import { domainUrl } from "../../domain_url";

const Interactions = ({ post: post_ }) => {
  //console.log("Post is: ", post);
  const user = useRecoilValue(userAtom);
  const [liked, setLiked] = useState(post_.likes.includes(user?._id));
  const showToast = useShowToast();

  const [post, setPost] = useState(post_);

  const [isLiking, setIsLiking] = useState(false);

  const [isReplying, setIsReplying] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [reply, setReply] = useState("");

  const handleLikes = async () => {
    if (!user)
      return showToast(
        "Error",
        "You must be logged in to like a post",
        "error"
      );

    if (isLiking) return;

    setIsLiking(true);

    try {
      const res = await fetch(`${domainUrl}/api/posts/like/${post._id}`, {
        credentials: "include",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.error) {
        return showToast("Error", data.error, "error");
      }
      console.log(data);

      if (!liked) {
        setPost({ ...post, likes: [...post.likes, user._id] });
      } else {
        setPost({ ...post, likes: post.likes.filter((id) => id !== user._id) });
      }

      setLiked(!liked);
    } catch (error) {
      showToast("Error", error, "error");
    } finally {
      setIsLiking(false);
    }
  };

  const handleReply = async () => {
    if (isReplying) return;

    setIsReplying(true);
    if (!user) {
      return showToast(
        "Error",
        "You must be logged in to reply to a post",
        "error"
      );
    }

    try {
      const res = await fetch(`/api/posts/reply/${post._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: reply }),
      });
      const data = await res.json();

      if (data.error) {
        return showToast("Error", data.error, "error");
      }
      console.log(data);

      setPost({ ...post, replies: [...post.replies, data.reply] });

      showToast("Success", "Reply posted successfully", "success");
      onClose();
    } catch (error) {
      showToast("Error", error, "error");
    } finally {
      setIsReplying(false);
    }
  };

  return (
    <Flex flexDirection={"column"}>
      <Flex
        gap={3}
        my={2}
        onClick={(Event) => {
          Event.preventDefault();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Like"
          color={liked ? "rgb(237,73,86)" : ""}
          fill={liked ? "rgb(237,73,86)" : "transparent"}
          viewBox="0 0 24 24"
          //stroke-width="1.5"
          stroke="currentColor"
          width="20"
          onClick={handleLikes}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            stroke="currentColor"
            strokeWidth={"2"}
          />
        </svg>

        <svg
          aria-label="Comment"
          xmlns="http://www.w3.org/2000/svg"
          fill="transparent"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="2"
          width={20}
          onClick={onOpen}
        >
          <title>Comment</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
          />
        </svg>

        <svg
          fill="currentColor"
          color="currentColor"
          width={25}
          height={25}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Repost</title>
          <path d="M19 7a1 1 0 0 0-1-1h-8v2h7v5h-3l3.969 5L22 13h-3V7zM5 17a1 1 0 0 0 1 1h8v-2H7v-5h3L6 6l-4 5h3v6z" />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width={20}
        >
          <path
            fillRule="evenodd"
            d="M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z"
            clipRule="evenodd"
          />
        </svg>
      </Flex>
      <Flex gap={2} alignItems={"center"}>
        <Text fontSize={"sm"} color={"gray.light"}>
          {post?.replies.length} replies
        </Text>
        <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
        <Text fontSize={"sm"} color={"gray.light"}>
          {post?.likes.length} likes
        </Text>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reply</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Input
                placeholder="Reply here!"
                value={reply}
                onChange={(Event) => setReply(Event.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleReply}
              isLoading={isReplying}
            >
              Reply
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Interactions;
