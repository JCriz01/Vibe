import { useState, useEffect } from "react";
import { useParams, useLoaderData } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner } from "@chakra-ui/react";
import useGetUserProfile from "../hooks/useGetUserProfile";
import Posts from "../components/Posts";
import UserHeader from "../components/UserHeader";
import { domainUrl } from "../../domain_url";
import { useUserStore } from "../store/userStore";
import { useAtom } from "jotai";
import userAtom from "../atoms/userAtom";
import { useQuery } from "@tanstack/react-query";

// UserPage component that will display a given users profile page.

const fetchUser = async (token, username) => {
  const res = await fetch(`${domainUrl}/api/users/profile/${username}`, {
    credentials: "include",
  });

  const data = await res.json();
  return data;
};

//TODO: Figure out how UserPage works, it gets a given users profile.
const UserPage = () => {
  const { user, loading } = useGetUserProfile();
  const { username } = useParams();

  const [userToken, setUserToken] = useAtom(userAtom);
  const currentUser = useUserStore((state) => state.user);
  const setCurrentUser = useUserStore((state) => state.updateAccount);
  const showToast = useShowToast();

  const [posts, setPosts] = useState([]);
  const [postLoading, setPostLoading] = useState(true);

  const token = useLoaderData();

  if (token) {
    setUserToken(token);
  }

  const query = useQuery({
    queryKey: ["users", "profile", currentUser.username, userToken],
    queryFn: ({ queryKey }) => fetchUser(queryKey[3], queryKey[2]),
    enabled: !!userToken,
  });

  console.log("Currently at UserPage,", username);
  console.log("Current User:", currentUser);
  //console.log("Token:", token);

  useEffect(() => {
    const getPosts = async () => {
      setPostLoading(true);
      try {
        const res = await fetch(`${domainUrl}/api/posts/user/${username}`, {
          credentials: "include",
        });
        console.log(res);
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

  useEffect(() => {
    if (query.data) {
      setCurrentUser(query.data);
    }
  }, [query.data, setCurrentUser]);

  useEffect(() => {
    setCurrentUser(query?.data);
  }, [query?.data, setCurrentUser]);

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
        <Posts key={post.id} post={post} postedBy={post.postedById} />
      ))}
    </>
  );
};

export default UserPage;
