import express from "express";
import {
  getUserProfile,
  loginUser,
  logoutUser,
  signupUser,
  followOrUnfollowUser,
  updateUser,
  getCurrentUser,
} from "../controllers/userController";
import passport from "../utils/passport";

const router = express.Router();

//setting routes for users
router.get(
  "/currentuser",
  passport.authenticate("jwt", { session: false }),
  getCurrentUser
);
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
  (req, res, next) => {
    console.log("running update user");
    console.log("req body is: ", req.body);
    next();
  },
  passport.authenticate("jwt", { session: false }),
  updateUser
);

export default router;
