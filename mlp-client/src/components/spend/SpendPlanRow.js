import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { currencyFormatter } from "../../utils/currencyFormatter";
import { saveUserBudget } from "../../actions/authActions";

// Note that currently we get a category from plaid called "Income"
// Transactions that have just the category of "Income" are counted towards other income
// In the manage transaction page, we show "Income" to the user as "Income - Other"
// And we give the option to the user to recategorize as "Income - Paycheck"
const payIncomeString = "Income - Paycheck";
const payIncomeDisplay = "Paycheck Total";
const otherIncomeString = "Income";
const otherIncomeDisplay = "Other Income Total";

const SpendPlanRow = (props) => {
  const { getAccessTokenSilently } = useAuth0();
  const [budget, setBudget] = useState("");
  // The onBlur isn't working right now
  const [activeRow, setActive] = useState(false);
  const { category, saveUserBudget, propBudget, spendingByCategory } = props;

  // We don't use the prop directly because it might not be defined
  let actualValue = 0;
  if (
    spendingByCategory &&
    category &&
    category.name &&
    spendingByCategory[category.name]
  ) {
    actualValue = spendingByCategory[category.name];
  }

  let displayCategoryName = "";
  if (props.category.name === otherIncomeString) {
    displayCategoryName = otherIncomeDisplay;
  } else if (props.category.name === payIncomeString) {
    displayCategoryName = payIncomeDisplay;
  } else {
    displayCategoryName = props.category.name;
  }

  const saveButton = () => {
    const budgetData = { name: category.name, payload: {} };
    let trimmedBudgetString = "";
    if (budget !== undefined && budget.trim) {
      trimmedBudgetString = budget.trim();
    }
    // This checks if the string in budget is a number
    let valid = false;
    // This if will check if budget.trim is an empty string
    // Also since budget is a string, we don't have to worry about if (0) being false
    if (trimmedBudgetString) {
      // Then make sure the budget string is a number value
      valid = !isNaN(trimmedBudgetString);
    }
    if (valid) {
      budgetData.payload[category.name] = parseFloat(trimmedBudgetString);
      // We only save the budget if it is a number
      // But should have UI here to tell the user something wrong happened if it isn't a number
      getAccessTokenSilently().then((accessToken) => {
        saveUserBudget(accessToken, budgetData);
      });
      // We can hide the save button because the save worked
      setActive(false);
    } else {
      // If the user clicked save but it wasn't a valid number, reset to redux state
      setBudget(propBudget);
    }
  };

  const onChangeValue = (event) => {
    let justNumber = event.target.value;
    // Note this operation shouldn't be necessary anymore
    // (at least in Chrome, can't type $ into numeric input)
    if (justNumber.charAt(0) === "$") {
      justNumber = justNumber.substring(1);
    }

    setBudget(justNumber);
    setActive(true);
  };

  useEffect(() => {
    // Note that we need to check if the budget was specifically set to 0
    if (category && (propBudget || propBudget === 0)) {
      // We should cast propBudget to a string since the rest of the component assumes it is a string
      setBudget(propBudget + "");
    }
  }, [propBudget, category, setBudget]);
  /*if (
    props.category.bankName !== "Transfer" &&
    props.category.bankName !== "Payment"
  ) {*/
  return (
    <tr>
      <td>{displayCategoryName}</td>
      <td></td>
      <td>
        {/* This is a controlled input
            Note that the currencyFormatter makes controlled edits difficult, e.g.
            value={currencyFormatter.format(budget)}
        */}
        <input
          value={budget}
          type="number"
          onChange={onChangeValue}
          className="save-focus"
        ></input>
        <button
          className="btn save"
          onClick={() => saveButton()}
          style={{ visibility: activeRow ? "visible" : "hidden" }}
        >
          Save
        </button>
      </td>
      <td>{currencyFormatter.format(actualValue)}</td>
    </tr>
  );
  /*} else {
    return <></>;
  }*/
};
const mapStateToProps = (state) => ({
  spendingByCategory: state.plaid.spendingByCategory,
});
const mapDispatchToProps = { saveUserBudget };

// Note that there is probably a better way to do this with React hooks now
export default connect(mapStateToProps, mapDispatchToProps)(SpendPlanRow);
