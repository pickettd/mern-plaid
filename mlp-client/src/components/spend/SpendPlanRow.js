import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { currencyFormatter } from "../../utils/currencyFormatter";
import { saveUserBudget } from "../../actions/authActions";

const SpendPlanRow = (props) => {
  const [budget, setBudget] = useState("");
  const { category, budgets, saveUserBudget } = props;

  const saveButton = () => {
    const budgetData = { name: category.name, payload: {} };
    // This checks if the string in budget is a number
    const valid = !isNaN(budget.trim());

    if (valid) {
      budgetData.payload[category.name] = parseFloat(budget);
      // We only save the budget if it is a number
      // But should have UI here to tell the user something wrong happened if it isn't a number
      saveUserBudget(budgetData);
    }
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
        <input value={budget} onChange={onChangeValue}></input>
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
