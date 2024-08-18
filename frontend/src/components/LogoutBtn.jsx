import { Button } from "@chakra-ui/react";
import userAtom from "../atoms/userAtom";
import useShowToast from "../hooks/useShowToast";
import { FiLogOut } from "react-icons/fi";
import { domainUrl } from "../../domain_url";
import { useSetAtom } from "jotai";

const LogoutBtn = () => {
  const showToast = useShowToast();
  const setUserToken = useSetAtom(userAtom);

  const handleLogout = async () => {
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
        showToast("Error", data.error, "error");
        return;
      }
      localStorage.removeItem("user-token");
      setUserToken(null);

      showToast("Success", "Logged out successfully", "success");
    } catch (error) {
      showToast("Error", error, "error");
    }
  };
  return (
    <Button
      disabled={true}
      position={"fixed"}
      top={"30px"}
      right={"30px"}
      size={"sm"}
      onClick={handleLogout}
    >
      <FiLogOut size={20} />
    </Button>
  );
};

export default LogoutBtn;
