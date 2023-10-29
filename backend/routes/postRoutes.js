import express from "express";
import {
  createPost,
  getPost,
  deletePost,
  likeOrUnlikePost,
  replyToPost,
  getPostFeeds,
} from "../controllers/postController.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/feed", protectRoute, getPostFeeds);
router.get("/:id", getPost);
router.post("/create", protectRoute, createPost);
router.delete("/:id", protectRoute, deletePost);
router.put("/like/:id", protectRoute, likeOrUnlikePost);
router.put("/reply/:id", protectRoute, replyToPost);

export default router;
