const express = require("express");
const urlRouter = require("./route/url");
const connectDB = require("./connect");
const URL = require("./model/url");
const app = express();
const PORT = 3000;

app.use(express.json());

connectDB()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.use("/url", urlRouter);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitedHistory: { timestamp: Date.now() } } }
  );

  res.redirect(entry.redirectUrl);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
