import jwt from "jsonwebtoken";

// Generating tokens and setting cookies
const generateTokenAndSetCookies = (userID, res) => {

	// Generate token
	const token = jwt.sign({userID}, process.env.JWT_SECRET, {
		expiresIn: "15d",
	});

	// Set cookies
	res.cookie("jwt", token, {
		httpOnly: true,
		//secure: true,
		maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
		sameSite: "strict", // csrf
	});

	return token;
};

export default generateTokenAndSetCookies;
