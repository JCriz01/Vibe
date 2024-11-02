import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import Interactions from "./Interactions";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { formatDistanceToNowStrict, set } from "date-fns";
import { domainUrl } from "../../domain_url";
import { useUserStore } from "../store/userStore";
import { useAtomValue } from "jotai";
import parseName from "../utils/helper/parseName";
import userAtom from "../atoms/userAtom";
import { is } from "date-fns/locale";

const Posts = ({ post, postedBy }) => {
  const currentUser = useUserStore((state) => state.user);
  const userToken = useAtomValue(userAtom);
  const [user, setUser] = useState(null);
  const showToast = useShowToast();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  console.log("post is ", post);

  console.log(currentUser, userToken);
  //fetching user from api
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`${domainUrl}/api/users/profile/${postedBy}`, {
          credentials: "include",
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        const data = await res.json();
        console.log(data);

        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setUser(data);
      } catch (error) {
        showToast("Error", error, "error");
        setUser(null);
      }
    };

    getUser();
  }, [postedBy, showToast]);

  const handleDeletePost = async (Event) => {
    try {
      Event.preventDefault();

      const res = await fetch(`${domainUrl}/api/posts/${post.id}`, {
        credentials: "include",
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      console.log(res);
      const data = await res.json();

      if (data.error) {
        showToast("Error", data.error, "error");
      }

      showToast("Success", "Post deleted successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  if (!user) return null;

  return (
    <Card className=" m-4">
      <CardContent>
        <Link
          onClick={(Event) => {
            Event.stopPropagation();
            if (!isOpen) navigate(`/${user.username}/post/${post.id}`);
          }}
        >
          <div className="flex gap-3 mb-4 py-5">
            <div className="flex flex-col items-center">
              <Avatar>
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{parseName(user.name)}</AvatarFallback>
              </Avatar>
              <div className="w-[2px] h-full bg-slate-500 my-2"></div>
              <div className="relative w-full">
                {post.replies.length === 0 && (
                  <div className="text-center text-xs">0</div>
                )}
                {post.replies[0] && (
                  <Avatar className="absolute top-0 left-4 p-1">
                    <AvatarImage src={post.replies[0].user.avatar} />
                    <AvatarFallback>
                      {parseName(post.replies[0].user.name)}
                    </AvatarFallback>
                  </Avatar>
                )}

                {post.replies[1] && (
                  <Avatar className="text-xs absolute bottom-0 p-1">
                    <AvatarImage src={post.replies[1].user.avatar} />
                    <AvatarFallback>
                      {parseName(post.replies[1].user.name)}
                    </AvatarFallback>
                  </Avatar>
                )}
                {post.replies[2] && (
                  <Avatar className="text-xs absolute top-0 right-4 p-1">
                    <AvatarImage src={post.replies[2].user.avatar} />
                    <AvatarFallback>
                      {parseName(post.replies[2].user.name)}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            </div>
            <div className="flex flex-col flex-1 gap-2">
              <div className="flex justify-between w-full">
                <div className="flex w-full items-center">
                  <p
                    className="text-sm font-bold cursor-pointer"
                    onClick={(event) => {
                      event.preventDefault();
                      navigate(`/${user.username}`);
                    }}
                  >
                    {user?.username}
                  </p>
                  <img src="" className="w-4 ml-1" alt="" />
                </div>
                <div className="flex gap-4 items-center">
                  <p className="text-xs text-right text-gray-400">
                    {formatDistanceToNowStrict(new Date(post.createdAt))} ago
                  </p>
                  {currentUser?.id === user.id && (
                    <AlertDialog
                      onClick={(Event) => {
                        Event.preventDefault();
                        Event.stopPropagation();
                      }}
                    >
                      <AlertDialogTrigger
                        asChild
                        onClick={(Event) => {
                          Event.stopPropagation();
                          setIsOpen(true);
                        }}
                      >
                        <Button
                          onClick={(Event) => {}}
                          variant="outline"
                          size="icon"
                          className="w-5 h-5 cursor-pointer"
                        >
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
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you sure you want to delete this post?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone, this will permanently
                            delete this post.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleDeletePost}>
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              </div>
              <p className="text-sm">{post.content}</p>
              {post.img && (
                <div className="rounded-md overflow-hidden border border-gray-300">
                  <img src={post.image} className="w-full" alt="" />
                </div>
              )}
              <div className="rounded-md overflow-hidden border border-gray-300">
                <img src="" className="w-full" alt="" />
              </div>
              <div className="flex gap-3 my-1">
                <Interactions post={post} />
              </div>
            </div>{" "}
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};
export default Posts;

/*
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
          */
