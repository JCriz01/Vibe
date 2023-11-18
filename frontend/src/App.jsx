import {Container} from "@chakra-ui/react";
import {Navigate, Route, Routes} from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import {useRecoilValue} from "recoil";
import userAtom from "./atoms/userAtom";
import LogoutBtn from "./components/LogoutBtn";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import CreatePost from "./components/CreatePost";

function App() {
	const user = useRecoilValue(userAtom);
	console.log("Currently at app, the user is: ", user);
	return (
		<Container maxW={{base: "640px", lg: "760px", "2xl": "45%"}}>
			<Header/>
			<Routes>
				<Route
					path="/"
					element={user ? <HomePage/> : <Navigate to="/auth"/>}
				/>
				<Route
					path="/auth"
					element={!user ? <AuthPage/> : <Navigate to="/"/>}
				/>
				<Route
					path="/update"
					element={user ? <UpdateProfilePage/> : <Navigate to="/auth"/>}
				/>
				<Route path="/:username" element={<UserPage/>}/>
				<Route path="/:username/post/:pid" element={<PostPage/>}/>
			</Routes>

			{user && <LogoutBtn/>}
			{user && <CreatePost/>}
		</Container>
	);
}

export default App;
