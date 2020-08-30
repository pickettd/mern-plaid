const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateNewTransactionSettingsInput(data) {
  let errors = {};
  let inputTransactionID = data.transactionID;
  let inputSettingsData = { ...data.settingData }.toString();

  // Convert empty fields to an empty string so we can use validator functions
  inputTransactionID = !isEmpty(data.transactionID) ? data.transactionID : "";
  inputSettingsData = !isEmpty(inputSettingsData) ? inputSettingsData : "";
  // Transaction ID check
  if (Validator.isEmpty(data.transactionID)) {
    errors.transactionID = "Transaction ID field is required";
  }
  // New Settings checks
  if (Validator.isEmpty(inputSettingsData)) {
    errors.settingData = "Setting Data field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
