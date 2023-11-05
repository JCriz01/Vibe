import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner } from "@chakra-ui/react";
import useGetUserProfile from "../hooks/useGetUserProfile";
import Posts from "../components/Posts";
import UserHeader from "../components/UserHeader";

const UserPage = () => {
  const { user, loading } = useGetUserProfile();
  const { username } = useParams();

  console.log(username);

  const showToast = useShowToast();

  const [posts, setPosts] = useState([]);
  const [postLoading, setPostLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      setPostLoading(true);
      try {
        const res = await fetch(`/api/posts/user/${username}`);
        const data = await res.json();

        console.log(data);
        setPosts(data);
      } catch (error) {
        showToast("Error", error.message, "error");
        setPosts([]);
      } finally {
        setPostLoading(false);
      }
    };

    getPosts();
  }, [username, showToast]);

  if (!user && loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    );
  }
  if (!user && !loading) {
    return <div>User not found</div>;
  }
  if (!user) {
    return null;
  }

  return (
    <>
      <UserHeader user={user} />

      {!postLoading && posts.length === 0 && <h1>User has no posts.</h1>}

      {postLoading && (
        <Flex justifyContent={"center"} my={12}>
          <Spinner size={"xl"}></Spinner>
        </Flex>
      )}

      {posts.map((post) => (
        <Posts key={post._id} post={post} postedBy={post.postedBy} />
      ))}
    </>
  );
};

export default UserPage;
