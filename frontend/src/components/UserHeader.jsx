import { useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { domainUrl } from "../../domain_url";
import { useUserStore } from "../store/userStore";
import { useAtomValue } from "jotai";
import userAtom from "../atoms/userAtom";
import parseName from "../utils/helper/parseName";

const UserHeader = ({ user }) => {
  console.log("user is: ", user);
  const toast = useToast();
  const showToast = useShowToast();
  const currentUser = useUserStore((state) => state.user); //user that logged in.
  const userToken = useAtomValue(userAtom);

  console.log("current user: ", currentUser);
  const [following, setFollowing] = useState(
    user.followers.some((follower) => follower.followerId === currentUser?.id)
  );
  const [updating, setUpdating] = useState(false);

  const copyURL = () => {
    const currentURL = window.location.href;

    navigator.clipboard.writeText(currentURL).then(() => {
      toast({
        title: "Account",
        description: "Successfully added user link to clipboard",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    });
  };

  const handleFollowUnfollow = async () => {
    if (!currentUser) {
      showToast("Error", "Please login to follow", "error");
      return;
    }
    if (updating) {
      return;
    }
    setUpdating(true);
    try {
      const res = await fetch(`${domainUrl}/api/users/follow/${user.id}`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (res.status === 401) {
        showToast("Error", "Unauthorized", "error");
        return;
      }

      const data = await res.json();

      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }

      if (following) {
        showToast("Success", "Unfollowed user", "success");
        user.followers.pop(); //removing follower
      } else {
        showToast("Success", "Followed user", "success");
        user.followers.push(currentUser?.id); //adding follower
      }
      setFollowing(!following);

      console.log(data);
    } catch (error) {
      showToast("Error", error, "error");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className=" gap-4 m-4 flex flex-col">
      <div className=" relative w-full h-40  ">
        <div className=" w-full h-full bg-gradient-to-r from-rose-400 to-red-700 rounded-md"></div>
        <Avatar className="absolute -bottom-4 left-6">
          <AvatarImage src={user.avatar} />
          <AvatarFallback className="">{parseName(user.name)}</AvatarFallback>
        </Avatar>
      </div>
      <div>
        <h2 className="font-bold text-xl">{user.name}</h2>
      </div>
      <div>
        <div className="flex gap-2">
          <p className="font-bold text-base">{user.followers.length} </p>
          <p className="text-slate-500"> Follower</p>
        </div>
        <p>{user.bio}</p>
      </div>
      <div className="gap-4 flex">
        {currentUser?.id === user.id && (
          <Link to="/update" className="flex-grow max-w-1/2">
            <Button className="w-full">Update Profile</Button>
          </Link>
        )}
        {currentUser?.id !== user.id && (
          <Button onClick={handleFollowUnfollow} className="flex-grow">
            {updating ? "Loading..." : following ? "Unfollow" : "Follow"}
          </Button>
        )}

        <Button className="flex-grow">
          <p>More...</p>
        </Button>
      </div>
    </div>
  );
};

export default UserHeader;

/*
    <VStack gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            {user.name}
          </Text>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"sm"}>{user.username}</Text>
            <Text
              fontSize={{
                base: "xs",
                md: "sm",
                lg: "md",
              }}
              bg={"gray.dark"}
              color={"gray.light"}
              p={1}
              borderRadius={"full"}
            >
              vibe.net
            </Text>
          </Flex>
        </Box>
        <Box>
          {user.profilePic && (
            <Avatar
              name={user.name}
              src={user.profilePic}
              size={{
                base: "md",
                md: "xl",
              }}
            />
          )}
          {!user.profilePic && (
            <Avatar
              name={user.name}
              src=""
              size={{
                base: "md",
                md: "xl",
              }}
            />
          )}
        </Box>
      </Flex>
      <Text>{user.bio}</Text>

      {currentUser?.id === user.id && (
        <Link as={RouterLink} to="/update">
          <Button size={"sm"}>Update Profile</Button>
        </Link>
      )}
      {currentUser?.id !== user.id && (
        <Button size={"sm"} onClick={handleFollowUnfollow} isLoading={updating}>
          {following ? "Unfollow" : "Follow"}
        </Button>
      )}

      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"}>{user.followers.length} Followers</Text>
          <Box w={1} h={1} bg={"gray.light"} borderRadius={"full"}></Box>
          <Link color={"gray.light"}>instagram.com</Link>
        </Flex>
        <Flex>
          <Box className="icon-container">
            <BsInstagram size={24} cursor={"pointer"} />
          </Box>
          <Box className="icon-container">
            <Menu>
              <MenuButton>
                <CgMoreO size={24} cursor={"pointer"} />
              </MenuButton>
              <Portal>
                <MenuList bg={"gray.dark"}>
                  <MenuItem
                    bg={"gray.dark"}
                    onClick={copyURL}
                    color={"gray.light"}
                  >
                    Copy Link
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Box>
        </Flex>
      </Flex>
      <Flex w={"full"}>
        <Flex
          flex={1}
          borderBottom={"1.5px solid white"}
          justifyContent={"center"}
          pd="3"
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}>Vibes</Text>
        </Flex>
        <Flex flex={1}>
          <Flex
            flex={1}
            borderBottom={"1px solid grey"}
            justifyContent={"center"}
            color={"gray.light"}
            pd="3"
            cursor={"pointer"}
          >
            <Text fontWeight={"bold"}>Replies</Text>
          </Flex>
        </Flex>
      </Flex>
    </VStack>
    */
