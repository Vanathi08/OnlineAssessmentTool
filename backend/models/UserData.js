const mongoose = require("mongoose");

const userDataSchema = new mongoose.Schema({
  username: String,
  moduleName: String,
  level: String,
  score: Number,
  completed: Boolean,
});

const UserData = mongoose.model("UserData", userDataSchema, "UserData");

module.exports = UserData;
