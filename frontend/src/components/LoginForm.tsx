import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAtom } from "jotai";
//import { useSetRecoilState } from "recoil";
import authScreenAtom from "../atoms/authAtom";
import useShowToast from "../hooks/useShowToast";
import userAtom from "../atoms/userAtom";
//import { useUserStore2 } from "../store/userStore";
import { domainUrl } from "../../domain_url";
import { useUserStore } from "../store/userStore";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import formSchema from "../utils/formSchema";
import "ldrs/ring";
import { Link } from "react-router-dom";

import { useToast } from "@/components/ui/use-toast";

const LoginForm = () => {
  const navigate = useNavigate();
  const [, setAuthScreen] = useAtom(authScreenAtom);
  const [userToken, setUserToken] = useAtom(userAtom);
  const setUser = useUserStore((state) => state.updateAccount);
  const [loading, setLoading] = useState(false);

  //const showToast = useShowToast();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(formData: z.infer<typeof formSchema>) {
    //do something with the values
    console.log(formData);
    setLoading(true);
    try {
      const res = await fetch(`${domainUrl}/api/users/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data.error) {
        toast({
          title: "Error",
          description: data.error,
          variant: "destructive",
        });
        return;
      }

      if (data.token) {
        localStorage.setItem("user-token", JSON.stringify(data.token));
        setUserToken(data.token);
        console.log("setting user token, value is now: ", userToken);

        setUser(data.user);
        toast({
          title: "Success",
          description: "Successfully logged in",
        });
        navigate("/");
      }
    } catch (error) {
      console.log("error from login", error);
      toast({
        title: "Error",
        description: "An error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center flex-cov h-full">
      <div className=" flex flex-col items-center mb-3 gap-4">
        <h2 className=" dark:text-white text-center self-center text-4xl font-bold">Login to your account</h2>
        <p className=" text-gray-600 font-sans text-lg">
          To have fun with the gang
        </p>
      </div>
      <Card className="p-3 md:w-3/5 lg:w-[520px] dark:bg-white">
        <CardContent className="flex flex-col ">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 p-3 flex flex-col dark:text-gray-900"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        className=" dark:text-gray-200 bg-white "
                        placeholder="username"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input className=" dark:text-gray-200 " {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-center">
                <p className=" self-center dark:text-gray-900 text-center">Dont have an account? {" "}
                  <Link to={"/"} onClick={() => setAuthScreen("register")}>
                    <p className={"text-blue-500"}>Sign Up</p>
                  </Link>
                </p>
              </div>
              {loading ? (
                <Button className="self-center" type="submit" disabled>
                  <l-ring />
                </Button>
              ) : (
                <Button className="self-center dark:bg-neutral-500" type="submit">
                  <p className={"dark:text-white"}>Login In</p>
                </Button>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
