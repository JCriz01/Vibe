import { Flex, Spinner, Text } from "@chakra-ui/react";
import useShowToast from "../hooks/useShowToast";
import { useEffect, useState } from "react";
import Posts from "../components/Posts";
import { domainUrl } from "../../domain_url";
import { useQuery } from "@tanstack/react-query";
import "ldrs/ring";
import { useAtomValue } from "jotai";
import userAtom from "../atoms/userAtom";
import { useUserStore } from "../store/userStore";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const showToast = useShowToast();
  //const [posts, setPosts] = useState([]);
  const userToken = useAtomValue(userAtom);
  const user = useUserStore((state) => state.user);
  //const [loading, setLoading] = useState(true);
  console.log("At HomePage, user is: ", user);

  if (!userToken) {
    navigate("/auth");
  }

  const getFeedPosts = async () => {
    //setLoading(true);
    try {
      const res = await fetch(`${domainUrl}/api/posts/feed`, {
        credentials: "include",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (res.status === 401 || res.statusText === "Unauthorized") {
        throw Error("Unauthorized");
        //showToast("Error", data.error, "error");
      }

      console.log("res from getFeedPosts", res);
      const data = await res.json();
      console.log("data from getFeedPosts", data);
      //setPosts(data);
      return data;
    } catch (error) {
      console.log("error from getFeedPosts", error);
      showToast("Error", error.message, "error");

      throw Error("Unauthorized");
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["posts", "feed"],
    queryFn: getFeedPosts,
  });

  if (isLoading) {
    return (
      <>
        <div className="flex justify-center ">
          <l-ring
            size="40"
            stroke="5"
            bg-opacity="0"
            speed="2"
            color="black"
          ></l-ring>
        </div>
      </>
    );
  }

  if (!isLoading) {
    console.log("data from homepage query: ", data);
    //console.log("error from homepage query", error.message);
  }

  return (
    <>
      {!isLoading && data.length === 0 && (
        <div className="flex flex-col flex-grow h-full justify-center items-center">
          <div>
            <h2 className="text-xl font-bold">No Feed Available.</h2>
          </div>
        </div>
      )}
      {data.length > 0 &&
        data.map((post) => (
          <Posts key={post.id} post={post} postedBy={post.postedBy.id} />
        ))}
    </>
  );
};

export default HomePage;
