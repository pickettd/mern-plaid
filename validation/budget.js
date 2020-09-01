const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateBudgetInput(data) {
  let errors = {};

  let inputBudgetName = data.budgetName;
  let inputBudgetAmount = data.budgetAmount;
  let inputBudgetSum = data.expenseBudgetSum;

  // Convert empty fields to an empty string so we can use validator functions
  inputBudgetName = !isEmpty(inputBudgetName) ? inputBudgetName : "";
  // Note that budgetAmount should be coerced to a string for the validator library
  // The reason that we have to check if it is zero is because isEmpty considers 0 to be empty
  if (inputBudgetAmount === "0" || inputBudgetAmount === 0) {
    inputBudgetAmount = "0";
  } else {
    inputBudgetAmount = !isEmpty(inputBudgetAmount)
      ? inputBudgetAmount + ""
      : "";
  }
  // Note that expenseBudgetSum should be coerced to a string for the validator library
  inputBudgetSum = !isEmpty(inputBudgetSum) ? inputBudgetSum + "" : "";
  // Budget Name checks
  if (Validator.isEmpty(inputBudgetName)) {
    errors.budgetName = "Budget Name is required";
  }
  // Budget Amount checks
  if (Validator.isEmpty(inputBudgetAmount)) {
    errors.budgetAmount = "Budget Amount field is required";
  }
  if (!Validator.isFloat(inputBudgetAmount)) {
    errors.budgetAmount = "Budget Amount field should be a number";
  }
  // Budget Sum checks
  if (Validator.isEmpty(inputBudgetSum)) {
    errors.expenseBudgetSum = "Expense Budget Sum field is required";
  }
  if (!Validator.isFloat(inputBudgetSum)) {
    errors.expenseBudgetSum = "Expense Budget Sum field should be a number";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
