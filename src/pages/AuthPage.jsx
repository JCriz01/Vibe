import { useRecoilValue, useSetRecoilState } from "recoil";
import SignupCard from "../components/SignupCard";
import LoginCard from "../components/LoginCard";
import authScreenAtom from "../atoms/authAtom";

const AuthPage = () => {
  const authScreenState = useRecoilValue(authScreenAtom);

  useSetRecoilState(authScreenAtom);
  return <>{authScreenState === "login" ? <LoginCard /> : <SignupCard />}</>;
};

export default AuthPage;
