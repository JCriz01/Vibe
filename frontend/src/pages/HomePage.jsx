import {Flex, Spinner, Text} from "@chakra-ui/react";
import useShowToast from "../hooks/useShowToast";
import {useEffect, useState} from "react";
import Posts from "../components/Posts";
import {domainUrl} from "../../domain_url";

const HomePage = () => {
	const showToast = useShowToast();
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getFeedPosts = async () => {
			setLoading(true);
			try {
				const res = await fetch(`${domainUrl}/api/posts/feed`, {
					credentials: "include",
				});
				const data = await res.json();

				if (data.error) {
					showToast("Error", data.error, "error");
					return;
				}
				setPosts(data);
			} catch (error) {
				showToast("Error", error, "error");
			} finally {
				setLoading(false);
			}
		};

		getFeedPosts();

	}, [showToast]);

	if (posts.message === "Unauthorized") return null;

	return (
		<>
			{loading && (
				<Flex justify={"center"}>
					<Spinner size="xl"/>
				</Flex>
			)}
			{!loading && posts.length === 0 && (
				<Flex justify={'center'}>
					<Text fontSize={'lg'}>No posts available, follow users.</Text>
				</Flex>
			)}
			{posts.map((post) => (
				<Posts key={post._id} post={post} postedBy={post.postedBy}/>
			))}
		</>
	);
};

export default HomePage;
