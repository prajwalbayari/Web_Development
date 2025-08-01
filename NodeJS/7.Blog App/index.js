const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const UserRouter = require("./routes/user");

const app = express();
const PORT = 8000;

mongoose.connect("mongodb://localhost:27017/blogify").then(() => {
  console.log("Connected to MongoDB");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));

app.use("/user", UserRouter);
app.get("/", (req, res) => {
  res.render("home");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
