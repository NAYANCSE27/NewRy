const express = require("express");
const cors = require("cors");
const { mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User");
const Post = require("./models/Post");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
// const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");

const app = express();
const salt = bcrypt.genSaltSync(10);
const secret = "mysecretdfghjk";

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

mongoose.connect(
  "mongodb+srv://node101:node101@node101.6h8jzwm.mongodb.net/blog?retryWrites=true&w=majority"
);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.findOne({ username });
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json({
          id: userDoc._id,
          username: userDoc.username,
        });
      });
    } else {
      res.status(400).json({ message: "Login failed!" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.post("/post", upload.single("file"), async (req, res) => {
  // const { file } = req.file;
  console.log("Request : ", req.file);

  // const parts = file.split("\\");
  // const ext = parts[parts.length - 1];
  // const newPath = parts[parts.length - 1];
  // fs.renameSync(path, newPath);

  const { title, summary, content } = req.body;
  // const postDoc = await Post.create({
  //   title,
  //   summary,
  //   content,
  //   cover: newPath,
  // });

  // res.json(postDoc);

  // console.log("Response : ", req.body);

  res.json({ files: req.body });
});

app.listen(4000, () => {
  console.log("Example app listening on port 4000!");
});
