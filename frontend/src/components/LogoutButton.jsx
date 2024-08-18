import React from "react";
import { Button } from "@/components/ui/button";
import userAtom from "../atoms/userAtom";
import { FiLogOut } from "react-icons/fi";
import { domainUrl } from "../../domain_url";
import { useSetAtom } from "jotai";

import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import "ldrs/ring";

const LogoutBtn = () => {
  const { toast } = useToast();
  const setUserToken = useSetAtom(userAtom);
  const [loading, setIsloading] = useState(false);
  const handleLogout = async () => {
    setIsloading(true);
    try {
      const res = await fetch(`${domainUrl}/api/users/logout`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (data.error) {
        toast({
          title: "Error",
          description: data.error,
          variant: "destructive",
        });
        return;
      }
      localStorage.removeItem("user-token");
      setUserToken(null);

      toast({
        title: "Success",
        description: "You have successfully logged out",
      });
      setIsloading(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred",
        variant: "destructive",
      });
    }
  };
  return (
    <>
      {loading ? (
        <Button disabled>
          <l-ring className="animate-spin" />
        </Button>
      ) : (
        <Button onClick={handleLogout}>
          <FiLogOut size={20} />
          Logout
        </Button>
      )}
    </>
  );
};

export default LogoutBtn;
