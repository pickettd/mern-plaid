const Validator = require("validator");
const isEmpty = require("is-empty");

const validUserSettingStrings = {
  spendRangeDays: true,
};

module.exports = function validateNewUserSettingInput(data) {
  let errors = {};
  let inputSettingString = data.settingString;
  let inputSettingData = { ...data.settingData }.toString();

  // Convert empty fields to an empty string so we can use validator functions
  inputSettingString = !isEmpty(data.inputSettingString)
    ? data.inputSettingString
    : "";
  inputSettingData = !isEmpty(inputSettingData) ? inputSettingData : "";
  // Transaction ID check
  if (Validator.isEmpty(data.inputSettingString)) {
    errors.inputSettingString = "Setting String field is required";
  }
  if (!validUserSettingStrings[inputSettingString]) {
    errors.inputSettingString = "Setting String is not valid setting";
  }
  // New Settings checks
  if (Validator.isEmpty(inputSettingData)) {
    errors.settingData = "Setting Data field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
