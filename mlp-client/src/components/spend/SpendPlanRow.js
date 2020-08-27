import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { currencyFormatter } from "../../utils/currencyFormatter";
import { saveUserBudget } from "../../actions/authActions";

const SpendPlanRow = (props) => {
  const [budget, setBudget] = useState("");
  const { category, budgets, spendingByCategory, saveUserBudget } = props;

  const saveButton = () => {
    const budgetData = {};
    budgetData[category.name] = budget;
    saveUserBudget(budgetData);
  };

  const onChangeValue = (event) => {
    let justNumber = event.target.value;
    if (justNumber.charAt(0) === "$") {
      justNumber = justNumber.substring(1);
    }
    setBudget(justNumber);
  };

  useEffect(() => {
    if (budgets && category && budgets[category.name]) {
      setBudget(budgets[category.name]);
    }
  }, [budgets, category, setBudget]);
  /*const renameCategory = (bankCategory) => {
    if (bankCategory === "Food and Drink") {
      return "Food";
    }
    if (bankCategory === "Recreation") {
      return "Entertainment";
    }
    if (bankCategory === "Shops") {
      return "Personal";
    }
    if (bankCategory === "Travel") {
      return "Transportation";
    }
    return bankCategory;
  };*/
  /*if (
    props.category.bankName !== "Transfer" &&
    props.category.bankName !== "Payment"
  ) {*/
  return (
    <tr>
      <td>{props.category.name}</td>
      <td></td>
      <td>
        {props.budgets && props.budgets[props.category.name] ? (
          // This example would be an uncontrolled input
          /*<input
            defaultValue={currencyFormatter.format(
              props.budgets[props.category.name]
            )}
          ></input>*/
          // This is a controlled input
          <input
            // Note that the currencyFormatter makes controlled edits difficult
            //value={currencyFormatter.format(budget)}
            value={budget}
            onChange={onChangeValue}
          ></input>
        ) : (
          <input />
        )}
        <button className="btn secondary" onClick={() => saveButton()}>
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
