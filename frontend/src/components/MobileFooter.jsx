import { useAtomValue } from "jotai";
import { Link } from "react-router-dom";
import userAtom from "../atoms/userAtom";
import { useUserStore } from "../store/userStore";

const Footer = () => {
  const userToken = useAtomValue(userAtom);
  const user = useUserStore((state) => state.user);
  return (
    <footer className="flex justify-evenly bg-white p-4 sm:hidden">
      <Link to={"/"}>
        <svg
          width="32px"
          height="32px"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#000000"
            d="M512 128 128 447.936V896h255.936V640H640v256h255.936V447.936z"
          />
        </svg>
      </Link>
      <Link to={"/search"}>
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
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </Link>

      <Link to={`/${user.username}`}>
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
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
      </Link>
    </footer>
  );
};

export default Footer;
