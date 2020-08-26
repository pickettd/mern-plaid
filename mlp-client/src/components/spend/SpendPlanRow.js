import React from "react";
import { connect } from "react-redux";
import { currencyFormatter } from "../../utils/currencyFormatter";

const SpendPlanRow = (props) => {
  const renameCategory = (bankCategory) => {
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
  };
  if (
    props.category.bankName !== "Transfer" &&
    props.category.bankName !== "Payment"
  ) {
    return (
      <tr key={props.category.bankName}>
        <td>{props.category.bankName}</td>
        <td>{renameCategory(props.category.bankName)}</td>
        <td>
          {props.budgets && props.budgets[props.category.bankName] ? (
            <input
              defaultValue={currencyFormatter.format(
                props.budgets[props.category.bankName]
              )}
            ></input>
          ) : (
            <input />
          )}
          <button className="btn secondary">Save</button>
        </td>
        <td>
          {currencyFormatter.format(
            props.spendingByCategory[props.category.bankName]
          )}
        </td>
      </tr>
    );
  } else {
    return <></>;
  }
};
const mapStateToProps = (state) => ({
  budgets: state.auth.budgets,
  categoryMap: state.auth.categoryMap,
  spendingByCategory: state.plaid.spendingByCategory,
});

// Note that there is probably a better way to do this with React hooks now
export default connect(mapStateToProps, {})(SpendPlanRow);
