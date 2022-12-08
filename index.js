import express from "express";
import bcrypt from "bcrypt";
import passport from "passport";
import { initalizePassport } from "./passport-config.js";
import flash from "express-flash";
import session from "express-session";

const app = express();

const users = [];
initalizePassport(passport, users);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(flash());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.set("view engine", "ejs");

app.get("/", checkAuthenticated, (req, res) => {
  res.render("index", { title: "Home" });
});

app.get("/login", checkNotAuthenticated, (req, res) => {
  res.render("login", { name: req.user?.name });
});

app.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

app.get("/register", checkNotAuthenticated, (req, res) => {
  res.render("register", { title: "Register" });
});

app.post("/register", checkNotAuthenticated, async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 1);
    users.push({
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
    });
    res.redirect("/login");
  } catch (error) {
    res.redirect("/register");
  }
  console.log(users);
});

app.delete("/logout", (req, res) => {
    req.logOut();
    res.redirect("/login");
});


function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}



app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
