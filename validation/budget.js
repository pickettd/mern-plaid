const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateBudgetInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.budgetName = !isEmpty(data.budgetName) ? data.budgetName : "";
  data.budgetAmount = !isEmpty(data.budgetAmount) ? data.budgetAmount : "";
  // Budget Name checks
  if (Validator.isEmpty(data.budgetName)) {
    errors.budgetName = "Budget Name is required";
  }
  // Budget Amount checks
  if (Validator.isEmpty(data.budgetAmount)) {
    errors.budgetAmount = "Budget Amount field is required";
  }
  if (!Validator.isFloat(data.budgetAmount)) {
    errors.budgetAmount = "Budget Amount field should be a string of a number";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
