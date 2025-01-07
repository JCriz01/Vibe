import React, { useState} from "react";
import { z } from "zod";
import { domainUrl } from "../../domain_url";
import authScreenAtom from "../atoms/authAtom";
import { useToast} from "@/components/ui/use-toast.ts";
import {Link, useNavigate} from "react-router-dom";
import {useAtom} from "jotai";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import userAtom from "../atoms/userAtom";
import signupFormSchema from "@/utils/signupFormSchema.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useUserStore} from "@/store/userStore.ts";
const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [, setAuthScreen] = useAtom(authScreenAtom);
  const [userToken, setUserToken] = useAtom(userAtom);
  const setUser = useUserStore((state)=> state.updateAccount);

  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
    }
  });

  console.log("errors in form",errors);

  const handleSignupClick = async (formData: z.infer<typeof signupFormSchema>) => {
    console.log("signup click, form data", formData);
    setLoading(true);
    try{
      const res = await fetch(`${domainUrl}/api/users/signup`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          username: formData.username,
          password: formData.password,
        }),
      });
      const data = await res.json();
      console.log(data);
      if(data.error){
        throw Error(data.error);
      }
      //data does not seem to return token, might remove this later and make user login after signup.
      if(data.token){
        localStorage.setItem("user-token", JSON.stringify(data.token));
        setUserToken(data.token);
        console.log("setting user token", data.token);

        setUser(data.user);
        toast({
          title: "Success",
          description: "Successfully registered"
        });

      }
      navigate("/");
    }catch (error) {
      console.log(error);
      toast({
        title: "Sign up error",
        description: error.message,
        variant: "destructive"
      });
      return;
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center flex-cov h-full">
      <div className=" flex flex-col items-center mb-3 gap-4">
        <h2 className=" dark:text-white text-center self-center text-4xl font-bold">
          Sign up
        </h2>
        <p className=" text-gray-600 font-sans text-lg">
          To have fun with the gang
        </p>
      </div>
      <Card className="p-3 md:w-3/5 lg:w-[520px] dark:bg-slate-900">
        <CardContent className="flex flex-col ">
          <form
            onSubmit={handleSubmit(handleSignupClick)}
            className=" p-3 flex flex-col dark:text-white space-y-8"
          >
            <div className={" flex items-center justify-between"}>
              <div className="">
                <label htmlFor="FullName">
                  Full Name
                  <span className={"mx-1 text-red-600"}>*</span>
                </label>
                {/* register your input into the hook by invoking the "register" function */}
                <input
                  required={true}
                  placeholder="Full Name"
                  {...register("fullName")}
                  className="flex h-10 w-full rounded-md border border-slate-200 dark:bg-slate-900 px-3 py-2 text-sm ring-offset-white"
                />
                {errors.fullName && (
                  <span className="text-red-800">{errors.fullName.message}</span>
                )}
              </div>
              
              <div className={""}>
                <label htmlFor="username">
                  Username
                  <span className={"mx-1 text-red-600"}>*</span>
                </label>
                <input
                  {...register("username", {required: true})}
                  required={true}
                  placeholder={"username"} type="text"
                  className={"flex h-10 w-full rounded-md border border-slate-200 dark:bg-slate-900 px-3 py-2 text-sm ring-offset-white"} />
                {errors.username && (
                  <span className="text-red-800">{errors.username.message}</span>
                )}
              </div>
            </div>
            
            <div className={"space-y-2"}>
              <label htmlFor="email">
                Email Address
                <span className={"mx-1 text-red-600"}>*</span>
              </label>
              <input
                {...register("email", { required: true })}
                required={true} type="email"
                className={"flex h-10 w-full rounded-md border border-slate-200 dark:bg-slate-900 px-3 py-2 text-sm ring-offset-white"}/>
              {errors.email && (
                <span className="text-red-800">{errors.email.message}</span>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="password">
                Password
                <span className={"mx-1 text-red-600"}>*</span>
              </label>
              {/* include validation with required or other standard HTML validation rules */}
              <input
                required={true}
                {...register("password", {required: true})}
                className="flex h-10 w-full rounded-md border border-slate-200 dark:bg-slate-900 px-3 py-2 text-sm ring-offset-white"
                placeholder="password"
              />
              {/* errors will return when field validation fails  */}
              {errors.password && (
                <span className="text-red-800">{errors.password.message}</span>
              )}
            </div>
            <div className="flex items-center justify-center">
              <p className=" self-center dark:white text-center">
                Already have an account?{" "}
                <Link to={"/"} onClick={() => setAuthScreen("login")}>
                  <span className={"text-blue-500"}>Login</span>
                </Link>
              </p>
            </div>
            {loading ? (
              <Button className="self-center" type="submit" disabled>
                <l-ring />
              </Button>
            ) : (
              <Button
                className="self-center dark:bg-cyan-900 w-full p-4"
                type="submit"
              >
                <p className={"dark:text-white font-medium"}>Sign Up</p>
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default SignupForm;