import { useRecoilValue, useSetRecoilState } from "recoil";
import SignupCard from "../components/SignupCard";
import LoginCard from "../components/LoginCard";
import authScreenAtom from "../atoms/authAtom";
import { useState } from "react";

const AuthPage = () => {
  const authScreenState = useRecoilValue(authScreenAtom);
  const [loading, setLoading] = useState(true);

  useSetRecoilState(authScreenAtom);
  return <>{authScreenState === "login" ? <LoginCard /> : <SignupCard />}</>;
};

export default AuthPage;
