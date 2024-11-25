const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  color: {
    type: String,
    require: true,
    default: "ffffff"
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },



});

const Tag = mongoose.model("Tag", userSchema);
module.exports = Tag;