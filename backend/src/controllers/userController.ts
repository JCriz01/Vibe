import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import { NextFunction, Request, Response } from "express";
import { User } from "@prisma/client";
import { prismaClient as prisma } from "../server";
import { UnprocessableEntityError } from "../exceptions/validation";
import { UserValidationError } from "../exceptions/user-validation";
import { ErrorCodes } from "../exceptions/root";
import { signupSchema } from "../schema/User";
import { issueJWT } from "../utils/utils";

//TODO: Remove this into its own type file
interface AuthInfo {
  message?: string;
}

export const getCurrentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as User;

  if (!user) {
    return next(
      new UserValidationError("User not found", ErrorCodes.USER_NOT_FOUND, 401)
    )
  }

  res.status(200).json(user);
};

//Sign up user
export const signupUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (process.env.NODE_ENV === "development") {
      return res.status(400).json({ error: "Signup is currently disabled." });
    }
    signupSchema.parse(req.body);
    const { name, email, username, password } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    console.log("User is: ", user);

    if (user) {
      return next(
        new UserValidationError("Username has been taken.", ErrorCodes.USER_ALREADY_EXISTS, 400)
      );
    }

    bcrypt.hash(password, 8, async (err, hash) => {
      if (err) {
        console.log(err);
        return next(err);
      } else {
        try {
          const newUser = await prisma.user.create({
            data: {
              name,
              email,
              username,
              password: hash,
            },
          });

          return res
            .status(201)
            .json({ success: "User created successfully.", user: newUser });
        } catch (error) {
          return next(error);
        }
      }
    });
  } catch (error: any) {
    console.log("Error in signupUser ", error);
    next(
      new UnprocessableEntityError(
        error.issues,
        "Validation Error",
        ErrorCodes.UNPROCESSABLE_ENTITY
      )
    );
  }
};

export const getUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  //query is either username or userId
  const { query } = req.params;

  console.log(req.params);

  console.log(query);
  try {
    let user: User | null;

    //finding via id or username in prisma
    user = await prisma.user.findFirst({
      where: {
        OR: [
          {
            id: query,
          },
          {
            username: query,
          },
        ],
      },
      include: {
        posts: true,
        followers: true,
        following: true,
      },
    });

    if (!user) {
      return next(
        new UserValidationError("User not found", ErrorCodes.USER_NOT_FOUND, 401)
      )
    }

    res.status(200).json(user);
  } catch (error: any) {
    console.log("Error in getUserProfile ", error.message);
    next(
      new UnprocessableEntityError(
        error.issues,
        "Validation Error",
        ErrorCodes.USER_NOT_FOUND
      )
    );
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: req.body.username,
      },
    });

    console.log("User is: ", user);

    if (!user) {
      throw Error("User not found");
    }

    const match = await bcrypt.compare(req.body.password, user.password);

    if (match) {
      //generating JWT token
      const token = issueJWT(user);
      console.log("Token is: ", token);
      res.json({
        success: "Access granted",
        token: token.token,
        expiresIn: token.expires,
        user,
      });
    } else {
      throw Error("Invalid username or password");
    }
  } catch (error: any) {
    console.log("Error in loginUser ", error);
    next(
      new UnprocessableEntityError(
        error.message,
        "Validation Error",
        ErrorCodes.USER_NOT_FOUND
      )
    );
  }
};

export const logoutUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    console.log("Error in logoutUser ", error.message);
  }
};

export const followOrUnfollowUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: targetId } = req.params;
    const userId = (req.user as User).id;
    const modifyUser = await prisma.user.findUnique({
      where: {
        id: targetId,
      },
    });

    const currentUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        following: {},
      },
    });

    console.dir(currentUser);

    if (!modifyUser || !currentUser) {
      return res.status(400).json({ error: "User not found" });
    }

    if (modifyUser?.id === userId.toString()) {
      return res
        .status(400)
        .json({ error: "You cannot follow/unfollow yourself" });
    }

    const isFollowing = currentUser.following.some((user) => {
      return user.followingId === modifyUser.id;
    });

    console.log("isFollowing: ", isFollowing);
    if (isFollowing) {
      await prisma.follow.delete({
        where: {
          followerId_followingId: {
            followingId: modifyUser.id,
            followerId: userId,
          },
        },
      });

      res.status(200).json({ message: "User unfollowed successfully" });
    } else {
      await prisma.follow.create({
        data: {
          followingId: modifyUser.id,
          followerId: userId,
        },
      });

      res.status(200).json({ message: "User followed successfully" });
    }
  } catch (error: any) {
    console.log("Error in followOrUnfollowUser ", error.message);
    next(
      new UnprocessableEntityError(
        error.issues,
        "Validation Error",
        ErrorCodes.USER_FOLLOW_ERROR
      )
    );
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, username, password, bio } = req.body;
  console.log("req.user is: ", req.user);
  let { avatar } = req.body;

  const userID = (req.user as User).id;
  try {
    let user = await prisma.user.findUnique({
      where: {
        id: userID,
      },
    });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (req.params.id !== userID.toString()) {
      return res
        .status(400)
        .json({ error: "You cannot update an other users profile!" });
    }
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    if (avatar) {
      if (user.avatar) {
        const avatarFileName = user.avatar.split("/").pop()?.split(".")[0];
        if (avatarFileName) {
          await cloudinary.uploader.destroy(avatarFileName);
        }
      }
      const uploadedResponse = await cloudinary.uploader.upload(avatar);

      avatar = uploadedResponse.secure_url;
    }

    user.name = name || user.name;

    user.email = email || user.email;

    user.username = username || user.username;

    user.avatar = avatar || user.avatar;

    user.bio = bio || user.bio;

    user = await prisma.user.update({
      where: {
        id: userID,
      },
      data: {
        ...user,
      },
    });

    //password will be null in the response
    user.password = "null";

    res.status(200).json(user);
  } catch (error: any) {
    console.log("Error in updateUser ", error.message);
    next(
      new UnprocessableEntityError(
        error.issues,
        "Validation Error",
        ErrorCodes.UNPROCESSABLE_ENTITY
      )
    );
  }
};
