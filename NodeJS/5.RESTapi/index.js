const express = require("express");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(`New request received: ${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  return res.send("Welcome to the home page!");
});

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = users.find((u) => u.id === userId);
    if (user) {
      return res.json(user);
    }
    return res.status(404).json({ message: "User not found" });
  })
  .delete((req, res) => {
    const userId = parseInt(req.params.id, 10);
    const userIndex = users.findIndex((u) => u.id === userId);
    if (userIndex !== -1) {
      users.splice(userIndex, 1);
      return res.send("User deleted successfully");
    }
    return res.status(404).json({ message: "User not found" });
  });

//Routes

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
