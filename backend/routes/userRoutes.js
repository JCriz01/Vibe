import express from "express";
import {protectRoute} from "../middlewares/protectRoute.js";
import {
  followOrUnfollowUser,
  getUserProfile,
  loginUser,
  logoutUser,
  signupUser,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

//setting routes for users
router.get("/profile/:query", getUserProfile);
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.post("/follow/:id", protectRoute, followOrUnfollowUser);
router.put("/update/:id", protectRoute, updateUser);

export default router;
