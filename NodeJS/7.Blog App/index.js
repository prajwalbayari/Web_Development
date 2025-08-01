const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const UserRouter = require("./routes/user");
const BlogRouter = require("./routes/blog");
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middleware/authentication");
const Blog = require("./models/Blog");

const app = express();
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/blogify";

mongoose.connect(MONGODB_URI).then(() => {
  console.log("Connected to MongoDB");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.resolve("./public")));
app.use(checkForAuthenticationCookie("token"));

app.use("/user", UserRouter);
app.use("/blog", BlogRouter);
app.get("/", async (req, res) => {
  try {
    const allBlogs = await Blog.find().populate("createdBy").sort({ createdAt: -1 });
    res.render("home", { user: req.user, blogs: allBlogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.render("home", { user: req.user, blogs: [] });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
