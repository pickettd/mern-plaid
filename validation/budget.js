const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateBudgetInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.budgetName = !isEmpty(data.budgetName) ? data.budgetName : "";
  // Note that budgetAmount should be coerced to a string for the validator library
  data.budgetAmount = !isEmpty(data.budgetAmount) ? data.budgetAmount + "" : "";
  // Note that expenseBudgetSum should be coerced to a string for the validator library
  data.expenseBudgetSum = !isEmpty(data.expenseBudgetSum)
    ? data.expenseBudgetSum + ""
    : "";
  // Budget Name checks
  if (Validator.isEmpty(data.budgetName)) {
    errors.budgetName = "Budget Name is required";
  }
  // Budget Amount checks
  if (Validator.isEmpty(data.budgetAmount)) {
    errors.budgetAmount = "Budget Amount field is required";
  }
  if (!Validator.isFloat(data.budgetAmount)) {
    errors.budgetAmount = "Budget Amount field should be a number";
  }
  // Budget Sum checks
  if (Validator.isEmpty(data.expenseBudgetSum)) {
    errors.expenseBudgetSum = "Expense Budget Sum field is required";
  }
  if (!Validator.isFloat(data.expenseBudgetSum)) {
    errors.expenseBudgetSum = "Expense Budget Sum field should be a number";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
