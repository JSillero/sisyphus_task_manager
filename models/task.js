const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    required: true,
    unique: false,
    enum: {
      values: ['Active', 'Completed', 'Refreshing'],
      message: '{VALUE} is not supported'
    },
    default: 'Active'
  },
  priority: {
    type: Number,
    required: true,
    default: 3,
    min: 1,
    max: 5,
  },
  tags: [{
    type: [mongoose.Types.ObjectId],
    ref: 'User',

  }],
  renewPeriod: {
    type: String,
    enum: {
      values: ['Daily', 'Weekly', 'Monthly', 'Not Repeating'],
      message: '{VALUE} is not supported'
    },
    default: 'Not Repeating',

  },

  renewDate: {
    type: Date,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },


},
  {
    timestamps: true
  });

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;