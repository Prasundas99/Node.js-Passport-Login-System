import LocalStrategy from "passport-local";
import bcrypt from "bcrypt";


export const initalizePassport = async(passport, user) => {
  const findUserByEmail = (email) => {
    return user.find((user) => user.email === email);
  };
  const findUserById = (id) => {
    return user.find((user) => user.id === id);
  };
  
  const authenticateUser = async (email, password, done) => {
    const user = findUserByEmail(email);
    console.log(user);
    if (user == null) {
      console.log("no user");
      return done(null, false, { message: "No user with that email" });
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        console.log("success")
        return done(null, user);
      } else {
        console.log("fail");
        return done(null, false, { message: "Password incorrect" });
      }
    } catch (e) {
      console.log("error");
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
