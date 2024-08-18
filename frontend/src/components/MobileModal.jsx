import { FiLogOut } from "react-icons/fi";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import LogoutBtn from "./LogoutButton";

const SideModal = () => {
  return (
    <Card className=" absolute top-24 w-1/2 sm:w-1/3 md:hidden ml-auto self-end flex flex-col items-center text-xs ">
      <CardContent className="w-full flex flex-col">
        <h2 className=" text-sm font-semibold self-center p-3">Options</h2>
        <Separator />
        <div className="flex items-center">
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
              d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
            />
          </svg>
          <p className="p-2">Messages</p>
        </div>
        <Separator />
      </CardContent>
      <CardFooter className="flex justify-center items-center">
        <LogoutBtn />
      </CardFooter>
    </Card>
  );
};

export default SideModal;
