import { Container } from "@chakra-ui/react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
//import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import { useAtom } from "jotai";
import LogoutBtn from "./components/LogoutBtn";
import CreatePost from "./components/CreatePost";
import { useQuery } from "@tanstack/react-query";
import { domainUrl } from "../domain_url";
import { useUserStore } from "./store/userStore";
import "ldrs/ring";
import { useEffect } from "react";
//TODO: Remember that storing user inside of a local storage is not secure

function App() {
  console.log("App component");

  //fetch user
  const setUser = useUserStore((state) => state.updateAccount);
  const user = useUserStore((state) => state.user);

  const [userToken, setUserToken] = useAtom(userAtom);

  console.log("At app level, userToken is: ", userToken);

  const fetchUserData = async () => {
    console.log("fetchUserData called");
    const token = JSON.parse(localStorage.getItem("user-token"));
    if (!token) {
      return { error: "No token found" };
    }
    setUserToken(token);

    const res = await fetch(`${domainUrl}/api/users/currentUser`, {
      credentials: "include",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (res.status === 401) {
      return { error: "Unauthorized" };
    }

    const data = await res.json();

    console.log("data from fetchUser", data);

    if (data.error) {
      return { userError: data.error };
    }
    setUser(data);
    return data;
  };

  /*
  const fetchUser = async (token) => {
    const res = await fetch(`${domainUrl}/api/users/currentUser`, {
      credentials: "include",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    console.log("data from fetchUser", data);

    if (data.error) {
      return { userError: data.error };
    }
    setUser(data);
    return data;
  };

  const fetchUserToken = () => {
    const token = JSON.parse(localStorage.getItem("user-token"));

    setUserToken(token);
    console.log("data from fetchUserToken", token);
    return token;
  };

  
  const {
    data: tokenData,
    status,
    error,
    isLoading,
  } = useQuery({
    queryKey: [userToken],
    queryFn: () => fetchUserToken(),
    enabled: userToken === null,
  });

  const validJwtToken = tokenData;

  const {
    userstatus,
    userError,
    isLoadingUserData,
    data: userData,
  } = useQuery({
    queryKey: ["user", validJwtToken],
    queryFn: () => fetchUser(validJwtToken),
    enabled: !!tokenData,
  });
  */

  const { data: userData, isLoading } = useQuery({
    queryKey: ["jwtToken"],
    queryFn: fetchUserData,
  });

  if (isLoading) {
    return (
      <div className="flex self-center justify-center">
        <l-ring
          className="self-center"
          size="40"
          stroke="5"
          bg-opacity="0"
          speed="2"
          color="black"
        ></l-ring>
      </div>
    );
  }

  if (userData) {
    console.log("userData is: ", userData);
  }

  return (
    <Container maxW={{ base: "640px", lg: "760px", "2xl": "45%" }}>
      <Header />
      <Outlet />
      {userToken && (
        <>
          <LogoutBtn />
          <CreatePost />
        </>
      )}
    </Container>
  );
}

export default App;
