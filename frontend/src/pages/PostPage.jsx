import { Flex, Avatar, Text, Image, Box, Divider } from "@chakra-ui/react";
import Interactions from "../components/Interactions";
import { useState, useEffect } from "react";
import Comments from "../components/Comments";
import useGetUserProfile from "../hooks/useGetUserProfile";
import { Spinner } from "@chakra-ui/spinner";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { Button } from "@chakra-ui/button";
import { formatDistanceToNowStrict } from "date-fns";
import { DeleteIcon } from "@chakra-ui/icons";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { useNavigate } from "react-router-dom";
import { domainUrl } from "../../domain_url";

const PostPage = () => {
  const { user, loading } = useGetUserProfile();
  const [post, setPost] = useState(null);
  const showToast = useShowToast();
  const currentUser = useRecoilValue(userAtom);

  const { pid } = useParams();

  const navigate = useNavigate();

  console.log(pid);

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await fetch(`${domainUrl}/api/posts/${pid}`);
        const data = await res.json();

        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        console.log(data);
        setPost(data);
      } catch (error) {
        showToast("Error", error.message, "error");
        setPost(null);
      } finally {
        //setPostLoading(false);
      }
    };

    getPost();
  }, [showToast, pid, setPost]);

  const handleDeletePost = async (Event) => {
    try {
      Event.preventDefault();

      if (!window.confirm("Are you sure you want to delete this post?")) {
        return;
      }
      const res = await fetch(`/api/posts/${post._id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.error) {
        showToast("Error", data.error, "error");
      }

      showToast("Success", "Post deleted successfully", "success");
      navigate(`/${user.username}`);
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  if (!user && loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    );
  }

  if (!post) return null;

  return (
    <>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Avatar src={user.profilePic} size={"md"} name="Crizpy" />
          <Flex>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              {user.username}
            </Text>
            <Image src="/check.png" w={4} h={4} ml={4} />
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={"center"}>
          <Text fontSize={"xs"} textAlign={"right"} color={"gray.light"}>
            {formatDistanceToNowStrict(new Date(post.createdAt))} ago
          </Text>

          {currentUser?._id === user._id && (
            <DeleteIcon size={20} onClick={handleDeletePost} />
          )}
        </Flex>
      </Flex>

      <Text my={3}>{post.text}</Text>

      {post.img && (
        <Box
          borderRadius={6}
          overflow={"hidden"}
          border={"1px solid"}
          borderColor={"gray.light"}
        >
          <Image src={post.img} w={"full"} />
        </Box>
      )}

      <Flex gap="3" my={3}>
        <Interactions post={post} />
      </Flex>

      <Divider my={4} />

      <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"2xl"}>waving</Text>
          <Text fontSize={"sm"} color={"gray.light"}>
            Get the app to interact with the boys
          </Text>
        </Flex>
        <Button>Get</Button>
      </Flex>

      <Divider my={4} />

      {post.replies.length === 0 && <h1>No replies yet</h1>}

      {post.replies.map((reply) => (
        <Comments key={reply._id} reply={reply} />
      ))}
    </>
  );
};

export default PostPage;
