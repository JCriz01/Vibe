import {Flex, Image, useColorMode} from "@chakra-ui/react";
import {useRecoilValue} from "recoil";
import userAtom from "../atoms/userAtom";
import {Link, Link as RouterLink} from "react-router-dom";
import {AiFillHome} from "react-icons/ai";
import {RxAvatar} from "react-icons/rx";

const Header = () => {
	const {colorMode, toggleColorMode} = useColorMode();
	const user = useRecoilValue(userAtom);

	return (
		<Flex justifyContent={user ? {base: "space-evenly", lg: "space-between"} : "center"} mt={6} mb={11}>
			{user && (
				<Link as={RouterLink} to="/">
					<AiFillHome size={24}/>
				</Link>
			)}
			<Image
				cursor={"pointer"}
				alt="logo"
				w={7}
				src={colorMode === "light" ? "/social.png" : "/social-white.png"}
				onClick={toggleColorMode}
			/>

			{user && (
				<Link as={RouterLink} to={`/${user.username}`}>
					<RxAvatar size={24}/>
				</Link>
			)}
		</Flex>
	);
};

export default Header;
