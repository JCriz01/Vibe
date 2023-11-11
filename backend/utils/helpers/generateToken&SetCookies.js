import jwt from "jsonwebtoken";

// Generate token and set cookies
const generateTokenAndSetCookies = (userID, res) => {
  console.log(
    "creating new user and using the user id to sign the token: ",
    userID
  );
  const token = jwt.sign({ userID }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  console.log("The token after generating it is: ", token);

  res.cookie("jwt", token, {
    httpOnly: true,
    //secure: true,
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    sameSite: "strict", // csrf
  });

  return token;
};

export default generateTokenAndSetCookies;
