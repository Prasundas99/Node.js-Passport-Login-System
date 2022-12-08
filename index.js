import express from "express";
import bcrypt from "bcrypt";

const app = express();

const users = [];

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

app.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

app.post("/login", (req, res) => {});

app.get("/register", (req, res) => {
  res.render("register", { title: "Register" });
});

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 69);
    users.push({
      id: Date.now().toString(),
      username,
      email,
      password: hashedPassword,
    });
    res.redirect("/login");
  } catch (error) {
    res.redirect("/register");
  }
  console.log(users);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
