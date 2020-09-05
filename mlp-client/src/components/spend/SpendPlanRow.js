import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { currencyFormatter } from "../../utils/currencyFormatter";
import { saveUserBudget } from "../../actions/authActions";

const SpendPlanRow = (props) => {
  const { getAccessTokenSilently } = useAuth0();
  const [budget, setBudget] = useState("");
  // The onBlur isn't working right now
  //const [activeRow, setActive] = useState(false);
  const { category, budgets, saveUserBudget } = props;

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
      // The onBlur isn't working right now
      //setActive(false);
    } else {
      // If the user clicked save but it wasn't a valid number, reset to redux state
      setBudget(budgets[category.name]);
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
    // The onBlur isn't working right now
    //setActive(true);
  };

  // This onblur tries to reset the row value and hide the button.
  // Problem is that the button hides before the onClick fires/happens
  // And that problem happens if it is using setBudget or even just setActive(false)
  /*
  const onBlur = () => {
    setActive(false);
    if (budgets && category && budgets[category.name]) {
      setBudget(budgets[category.name]);
    } else {
      setBudget("");
    }
  };*/

  useEffect(() => {
    if (budgets && category && budgets[category.name]) {
      setBudget(budgets[category.name]);
    }
  }, [budgets, category, setBudget]);
  /*if (
    props.category.bankName !== "Transfer" &&
    props.category.bankName !== "Payment"
  ) {*/
  return (
    <tr>
      <td>{props.category.name}</td>
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
          // The onBlur isn't working right now
          //onBlur={onBlur}
        ></input>
        <button
          className="btn secondary"
          onClick={() => saveButton()}
          // This is designed to work with the onBlur that isn't working right now
          //style={{ visibility: activeRow ? "visible" : "hidden" }}
        >
          Save
        </button>
      </td>
      <td>
        {currencyFormatter.format(
          props.spendingByCategory[props.category.name]
        )}
      </td>
    </tr>
  );
  /*} else {
    return <></>;
  }*/
};
const mapStateToProps = (state) => ({
  budgets: state.auth.budgets,
  categoryMap: state.auth.categoryMap,
  spendingByCategory: state.plaid.spendingByCategory,
});
const mapDispatchToProps = { saveUserBudget };

// Note that there is probably a better way to do this with React hooks now
export default connect(mapStateToProps, mapDispatchToProps)(SpendPlanRow);
