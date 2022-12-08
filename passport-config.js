import LocalStrategy from "passport-local";
import bcrypt from "bcrypt";
import { findUserByEmail, findUserById } from "./services/userService";

export const initalizePassport = async(passport) => {
  const authenticateUser = async (email, password, done) => {
    const user = findUserByEmail(email);
    if (user == null) {
      return done(null, false, { message: "No user with that email" });
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Password incorrect" });
      }
    } catch (e) {
      return done(e);
    }
  };

  passport.use(
    new LocalStrategy.Strategy({ usernameField: "email" },
    authenticateUser
  ));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    return done(null, findUserById(id));
  });
};
