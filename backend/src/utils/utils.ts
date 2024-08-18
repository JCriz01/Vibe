import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET || "secret";

//utility functions for backend application.
export const issueJWT = (user: User) => {
  const id = user.id;

  const expiresIn = "1d";

  const payload = {
    sub: id,
    iat: Date.now(),
  };

  const signedToken = jwt.sign(payload, jwtSecret, { expiresIn });

  return {
    token: signedToken,
    expires: expiresIn,
  };
};
