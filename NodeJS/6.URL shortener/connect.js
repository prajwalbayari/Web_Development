const mongoose = require("mongoose");

async function connectDB() {
  return mongoose.connect("mongodb://localhost:27017/urlShortener");
}


module.exports = connectDB;
