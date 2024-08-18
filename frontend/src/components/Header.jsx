import { Flex, Image, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { useUserStore } from "../store/userStore";
import { useTheme } from "@/components/theme-provider";
import LogoutBtn from "./LogoutButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useAtom } from "jotai";
import modalAtom from "../atoms/modalAtom";
import parseName from "../utils/helper/parseName";

const Header = () => {
  const [modalOpen, setModalOpen] = useAtom(modalAtom);
  const { setTheme } = useTheme();
  const { colorMode, toggleColorMode } = useColorMode();
  //const user = useRecoilValue(userAtom);
  const user = useUserStore((state) => state.user);

  const handleModal = () => {
    console.log("modalOpen", modalOpen);
    setModalOpen(!modalOpen);
  };

  return (
    <header className="bg-slate-50 flex justify-center">
      <div className=" flex p-4 items-center justify-between md:justify-start w-full max-w-[1940px] ">
        <div className="h-16 w-16 ">Logo</div>
        <div className="px-4 md:px-6">
          <Input />
        </div>
        <div className="hidden md:flex items-center ml-20 gap-4 text-gray-600">
          <div>
            <Link to={"/"}>Home</Link>
          </div>
          <div>
            <p>Messages</p>
          </div>
          <div>
            <p>testing</p>
          </div>
        </div>
        <Popover className="ml-auto hidden md:flex items-center">
          <PopoverTrigger className="ml-auto hidden md:flex items-center">
            <Avatar className="">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{parseName(user.name)}</AvatarFallback>
            </Avatar>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className=" w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
              />
            </svg>
          </PopoverTrigger>
          <PopoverContent>
            <Link to={`/${user.username}`}>Profile</Link>
            <p>Settings</p>
            <LogoutBtn />
          </PopoverContent>
        </Popover>
        <div className=" cursor-pointer md:hidden " onClick={handleModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
      </div>
    </header>
  );

  /*
  return (
    <div className=" flex justify-evenly py-5 bg-slate-50 ">
      {user && (
        <Link as={RouterLink} to="/">
          <AiFillHome size={24} />
        </Link>
      )}
      <Image
        cursor={"pointer"}
        alt="logo"
        w={7}
        src={colorMode === "light" ? "/social.png" : "/social-white.png"}
        onClick={toggleColorMode}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {user.id && (
        <Link as={RouterLink} to={`/${user.username}`}>
          <RxAvatar size={24} />
        </Link>
      )}
    </div>
  );
  */
};

export default Header;
