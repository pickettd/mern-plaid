import React from "react";
import { connect } from "react-redux";

const SpendPlanRow = (props) => {
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
  if (
    props.category.bankName !== "Transfer" &&
    props.category.bankName !== "Payment"
  ) {
    return (
      <tr key={props.category.bankName}>
        <td>{props.category.bankName}</td>
        <td>
          {props.categoryMap && props.categoryMap[props.category.bankName] ? (
            <input
              defaultValue={props.categoryMap[props.category.bankName]}
            ></input>
          ) : (
            <input />
          )}
          <button className="">Save</button>
        </td>
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
          <button className="">Save</button>
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
