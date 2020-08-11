const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateSingleTransactionsCategoryMapInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.transactionID = !isEmpty(data.transactionID) ? data.transactionID : "";
  data.newCategoryName = !isEmpty(data.newCategoryName)
    ? data.newCategoryName
    : "";
  // Transaction ID check
  if (Validator.isEmpty(data.transactionID)) {
    errors.bankCategoryName = "Transaction ID field is required";
  }
  // New Name checks
  if (Validator.isEmpty(data.newCategoryName)) {
    errors.newCategoryName = "New Category Name field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
