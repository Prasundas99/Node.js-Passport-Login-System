import express from "express";
import bcrypt from "bcrypt";
import passport from "passport";
import { initalizePassport } from "./passport-config.js";
import flash from "express-flash";
import session from "express-session";
import { checkNotAuthenticated } from "./middlewares/checkNotAuthenticated.js";
import { checkAuthenticated } from "./middlewares/checkAuthenticated.js";
import { config, RouteNames, users, ViewNames } from "./config/config.js";
import { registerInputDto } from "./DTOs/auth.js";
import { userObject } from "./DTOs/users.js";

const app = express();

initalizePassport(passport);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(flash());
app.use(
  session({
    secret: config.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.set("view engine", "ejs");

app.get(RouteNames.HOME, checkAuthenticated, (req, res) => {
  res.render(ViewNames.INDEX, { title: "Home" });
});

app.get(RouteNames.LOGIN, checkNotAuthenticated, (req, res) => {
  res.render(ViewNames.LOGIN, { name: req.user?.name });
});

app.post(
  RouteNames.LOGIN,
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: RouteNames.HOME,
    failureRedirect: RouteNames.LOGIN,
    failureFlash: true,
  })
);

app.get(RouteNames.REGISTER, checkNotAuthenticated, (req, res) => {
  res.render(ViewNames.REGISTER);
});

app.post(RouteNames.REGISTER, checkNotAuthenticated, async (req, res) => {
  const response = registerInputDto(req.body);
  try {
    const hashedPassword = await bcrypt.hash(response.password, 69);
    users.push(userObject({ ...response, password: hashedPassword }));
    res.redirect(RouteNames.LOGIN);
    // res.return(req.body )
  } catch (error) {
    res.redirect(RouteNames.REGISTER);
  }
  console.log(users);
});

app.delete(RouteNames.LOGOUT, (req, res) => {
  req.logOut();
  res.redirect(RouteNames.LOGIN);
});

app.listen(config.PORT, () => {
  console.log("Server is running on port 3000");
});
