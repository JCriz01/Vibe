import SignupForm from "../components/SignupForm";
import authScreenAtom from "../atoms/authAtom";
import LoginForm from "../components/LoginForm";
import { useAtom, useAtomValue } from "jotai";
const AuthPage = () => {
  const authScreenState = useAtomValue(authScreenAtom);

  //useSetRecoilState(authScreenAtom);

  return <>{authScreenState === "login" ? <LoginForm /> : <SignupForm />}</>;
};

export default AuthPage;
