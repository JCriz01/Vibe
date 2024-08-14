import SignupCard from "../components/SignupCard";
import LoginCard from "../components/LoginCard";
import authScreenAtom from "../atoms/authAtom";
import { useAtom, useAtomValue } from "jotai";
const AuthPage = () => {
  const authScreenState = useAtomValue(authScreenAtom);

  //useSetRecoilState(authScreenAtom);

  return <>{authScreenState === "login" ? <LoginCard /> : <SignupCard />}</>;
};

export default AuthPage;
