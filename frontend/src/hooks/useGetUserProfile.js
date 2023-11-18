import {useEffect, useState} from "react";
import useShowToast from "./useShowToast";
import {useParams} from "react-router";
import {domainUrl} from "../../domain_url";


const useGetUserProfile = () => {
	const [user, setUser] = useState(null);

	const [loading, setLoading] = useState(true);
	const {username} = useParams();

	const showToast = useShowToast();

	useEffect(() => {
		const getUser = async () => {
			try {
				const res = await fetch(`${domainUrl}/api/users/profile/${username}`, {
					credentials: "include",
				});

				if (!res.ok) throw new Error("Something went wrong!");

				console.log("Inside useGetUserProfile, res is: ", res);
				const data = await res.json();

				if (data.error) {
					showToast("User Error", data.error, "error");
					return;
				}

				setUser(data);
			} catch (error) {
				showToast("Data Error", error.message, "error");
			} finally {
				setLoading(false);
			}
		};

		getUser();
	}, [username, showToast]);

	return {loading, user};
};

export default useGetUserProfile;
