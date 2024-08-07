import { User } from "@prisma/client";
import { prismaClient as prisma } from "../server";
import { NextFunction, Request, Response } from "express";
import { BadRequestsException } from "../exceptions/bad-requests";
import { ErrorCodes } from "../exceptions/root";
require("dotenv").config();
import { v2 as cloudinary } from "cloudinary";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

//finding specific post
export const getPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("running getPost");
    const post = await prisma.post.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    next(new BadRequestsException("Post not found", ErrorCodes.POST_NOT_FOUND));
  }
};

//creating post
export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postedBy, content } = req.body;
    console.log(req.body);
    let { img } = req.body;

    //TODO: Replace this with zod validation?
    if (!postedBy || !content) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const user = req.user;
    /*TODO: remove this in place of const user = req.user.
    const user = await prisma.user.findUnique({
      where: {
        id: postedBy,
      },
    });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (user.id.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: "unauthorized to post" });
    }
    */

    const maxLength = 500;

    if (content.length > maxLength) {
      return res
        .status(400)
        .json({ error: `Text must be less than ${maxLength} characters` });
    }

    if (img) {
      const uploadedResponse = await cloudinary.uploader.upload(img);
      img = uploadedResponse.secure_url;
    }

    const newPost = await prisma.post.create({
      data: {
        postedById: postedBy,
        content: content,
        image: img,
      },
    });

    res.status(201).json({ success: "Post created successfully", newPost });
  } catch (error: any) {
    console.log(error);
    next(
      new BadRequestsException(
        "Post Creation Error",
        ErrorCodes.POST_CREATION_ERROR
      )
    );
  }
};

//deleting post
export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const user = req.user as User;

    if (post.postedById.toString() !== user.id.toString()) {
      return res.status(401).json({ error: "Unauthorized to delete post!" });
    }

    if (post.image) {
      const imageId = post.image.split("/").pop()?.split(".")[0];

      imageId ? await cloudinary.uploader.destroy(imageId) : null;
    }

    await prisma.post.delete({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({ success: "Post deleted successfully" });
  } catch (error) {
    next(new BadRequestsException("Post not found", ErrorCodes.POST_NOT_FOUND));
  }
};

export const likeOrUnlikePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: postId } = req.params;
    const userId = (req.user as User).id;

    console.log(postId, userId);

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    console.log("Post is: ", post);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const userLikedPost = await prisma.user.findFirst({
      where: {
        AND: [
          {
            id: userId,
          },
          {
            likes: {
              some: {
                postId: postId,
              },
            },
          },
        ],
      },
      include: {
        likes: {
          where: {
            postId: postId,
          },
        },
      },
    });

    console.log("User that interacted with post: ", userLikedPost);

    if (userLikedPost) {
      await prisma.like.delete({
        where: {
          id: userLikedPost.likes[0].id,
        },
      });
      res.status(200).json({ success: "Post unliked successfully" });
    } else {
      await prisma.like.create({
        data: {
          userId: userId,
          postId: post.id,
        },
      });

      res.status(200).json({ success: "Post liked successfully" });
    }
  } catch (error: any) {
    next(new BadRequestsException("Post not found", ErrorCodes.POST_NOT_FOUND));
  }
};

export const replyToPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { text } = req.body;
    const postId = req.params.id;
    const userId = (req.user as User).id;
    const userProfilePic = (req.user as User).avatar;
    const username = (req.user as User).username;

    console.log(userProfilePic);
    if (!text) {
      return res.status(400).json({ error: "Text field is required." });
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    console.log("post is: ", post);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const reply = { userId, text, userProfilePic, username };

    const newReply = await prisma.reply.create({
      data: {
        postId: postId,
        userId: userId,
        content: text,
      },
    });

    res.status(200).json({ success: "Reply added successfully", newReply });
  } catch (error: any) {
    next(new BadRequestsException("Post not found", ErrorCodes.POST_NOT_FOUND));
  }
};

export const getPostFeeds = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("running getPostFeeds");
    const userId = (req.user as User).id;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    console.log("User is: ", user);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    //const following = user.following;

    //console.log("following is: ", following);

    //res.status(200).json(feedPosts);
  } catch (error: any) {
    next(new BadRequestsException("Post not found", ErrorCodes.POST_NOT_FOUND));
  }
};

export const getUserPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username } = req.params;
  try {
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const posts = await prisma.post.findMany({
      where: {
        postedById: user.id,
      },
      include: {
        postedBy: true,
        likes: true,
        replies: {
          include: {
            childReplies: {
              include: {
                likes: true,
              },
            },
          },
        },
      },
    });

    res.status(200).json(posts);
  } catch (error: any) {
    next(new BadRequestsException("Post not found", ErrorCodes.POST_NOT_FOUND));
  }
};
