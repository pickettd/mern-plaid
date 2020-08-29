const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSettingsSchema = new Schema({
  userCategories: [String],
  isReviewed: {
    type: Boolean,
    default: false,
  },
  isDuplicate: {
    type: Boolean,
    default: false,
  },
});

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
  },
  date: {
    type: Date,
    default: Date.now,
  },*/
  perTransactionSettings: {
    type: Map,
    of: transactionSettingsSchema,
    default: {},
  },
  budgets: {
    type: Map,
    of: Number,
    default: {},
  },
  expenseBudgetSum: {
    type: Number,
    default: 0,
  },
  spendRangeDays: {
    type: Number,
    default: 30,
    min: 1,
    max: 30,
  },
});

module.exports = User = mongoose.model("users", UserSchema);
