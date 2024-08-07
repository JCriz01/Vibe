import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  likeOrUnlikePost,
  replyToPost,
  getPostFeeds,
  getUserPosts,
} from "../controllers/postController";
import passport from "../utils/passport";

const router = express.Router();

//setting up routes for posts
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  createPost
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deletePost
);

router.get(
  "/feed",
  passport.authenticate("jwt", { session: false }),
  getPostFeeds
);
router.get("/:id", getPost);

router.put(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  likeOrUnlikePost
);

router.get("/user/:username", getUserPosts);

router.put(
  "/reply/:id",
  passport.authenticate("jwt", { session: false }),
  replyToPost
);

export default router;
