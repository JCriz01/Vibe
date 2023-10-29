import { Button, Flex, Spinner } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { useEffect, useState } from "react";
import Posts from "../components/Posts";

const HomePage = () => {
  const showToast = useShowToast();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFeedPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/posts/feed");
        const data = await res.json();

        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        console.log(data);
        setPosts(data);
      } catch (error) {
        showToast("Error", error, "error");
      } finally {
        setLoading(false);
      }
    };

    getFeedPosts();
  }, [showToast]);

  return (
    <>
      {loading && (
        <Flex justify={"center"}>
          <Spinner size="xl" />
        </Flex>
      )}
      {!loading && posts.length === 0 && <h1>Feed is empty, follow users.</h1>}
      {posts.map((post) => (
        <Posts key={post._id} post={post} postedBy={post.postedBy} />
      ))}
    </>
  );
};

export default HomePage;
