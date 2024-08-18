import { Container } from "@chakra-ui/react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
//import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import { useAtom, useAtomValue } from "jotai";
import LogoutBtn from "./components/LogoutBtn";
import CreatePost from "./components/CreatePost";
import { useQuery } from "@tanstack/react-query";
import { domainUrl } from "../domain_url";
import { useUserStore } from "./store/userStore";
import "ldrs/ring";
import Footer from "./components/MobileFooter";
import SideModal from "./components/MobileModal";
import modalAtom from "./atoms/modalAtom";

function App() {
  //fetch user
  const setUser = useUserStore((state) => state.updateAccount);
  const user = useUserStore((state) => state.user);

  const [userToken, setUserToken] = useAtom(userAtom);

  const modalOpen = useAtomValue(modalAtom);

  console.log("At app level, userToken is: ", userToken);

  const fetchUserData = async () => {
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
    //console.log("userData is: ", userData);
  }

  return (
    <div className="flex flex-col  h-full relative">
      <Header />
      <Outlet />
      {modalOpen ? <SideModal /> : null}
      <Footer />
      {userToken && (
        <>
          <CreatePost />
        </>
      )}
    </div>
  );
}

export default App;

//sm:w-full lg:max-w-md 2xl:max-w-[45%] mx-auto h-full
