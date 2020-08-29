const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  // Commenting out name, email, and password since we use Auth0 now
  /*
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },*/
  date: {
    type: Date,
    default: Date.now,
  },
  singleTransactionsCategoryMap: {
    type: Map,
    of: String,
  },
  budgets: {
    type: Map,
    of: Number,
  },
  expenseBudgetSum: {
    type: Number,
  },
});

module.exports = User = mongoose.model("users", UserSchema);
