import express from "express";
import {
  getUserProfile,
  loginUser,
  logoutUser,
  signupUser,
  followOrUnfollowUser,
  updateUser,
} from "../controllers/userController";
import passport from "../utils/passport";

const router = express.Router();

//setting routes for users
router.get("/profile/:query", getUserProfile);
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.post(
  "/follow/:id",
  passport.authenticate("jwt", { session: false }),
  followOrUnfollowUser
);
router.put(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  updateUser
);

export default router;
