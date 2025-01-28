const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true,"Username is a required field."],
    unique: true,
  },
  password: {
    type: String,
    required: [true,"Password is a required field."],
    //since this field will be encrypted bbefore being inputted, to assure the value is not null it must be checked before in the controller
  },
  email: {
    type: String,
    unique: [true, "Email already in use"],
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