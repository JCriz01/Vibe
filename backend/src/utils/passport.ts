import passport from "passport";
//import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { PrismaClient, User } from "@prisma/client";
//import bcrypt from "bcryptjs";
const prisma = new PrismaClient();
require("dotenv").config();

//passport js jwt strategy
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || "secret",
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    console.log("running jwt strategy");
    try {
      console.log(jwt_payload);
      const user = await prisma.user.findUnique({
        where: {
          id: jwt_payload.sub,
        },
      });
      console.log(user);
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  })
);

export default passport;
