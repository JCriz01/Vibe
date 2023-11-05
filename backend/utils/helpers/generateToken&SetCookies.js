import jwt from "jsonwebtoken";

// Generate token and set cookies
const generateTokenAndSetCookies = (userID, res) => {
  const token = jwt.sign({ userID }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    //sameSite: "none", // csrf
  });
  return token;
};

export default generateTokenAndSetCookies;
