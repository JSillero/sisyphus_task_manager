const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,

  },
  validated: {
    type: Boolean,
    required: true,
    default: false,
  },
  profilePicture: {
    type: String,
    required: false,
    unique: false,
    default: "",
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;