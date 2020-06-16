const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  categoryOverrides: [{
    pattern: String,
    flags: String,
    mainCategory: String,
    subCategory: String
  }],
  budgets: {
    type: Map,
    of: Number
  }
});

module.exports = User = mongoose.model("users", UserSchema);
