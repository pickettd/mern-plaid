const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateCategoryMapInput(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.bankCategoryName = !isEmpty(data.bankCategoryName) ? data.bankCategoryName : "";
    data.newCategoryName = !isEmpty(data.newCategoryName) ? data.newCategoryName : "";
    // Bank Name checks
    if (Validator.isEmpty(data.bankCategoryName)) {
      errors.bankCategoryName = "Bank Category Name field is required";
    }
    // New Name checks
    if (Validator.isEmpty(data.newCategoryName)) {
        errors.newCategoryName = "New Category Name field is required";
    }
  
    return {
      errors,
      isValid: isEmpty(errors)
    };
}