import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { currencyFormatter } from "../../utils/currencyFormatter.js";

// Note that currently we get a category from plaid called "Income"
// Transactions that have just the category of "Income" are counted towards other income
// In the manage transaction page, we show "Income" to the user as "Income - Other"
// And we give the option to the user to recategorize as "Income - Paycheck"
const payIncomeString = "Income - Paycheck";
//const payIncomeDisplay = "Paycheck Total";
const otherIncomeString = "Income";
//const otherIncomeDisplay = "Other Income Total";

const PlanTotalRow = (props) => {
  const {
    budgets,
    expenseBudgetSum,
    spendingSum,
    incomeSum,
    rowDisplayName,
  } = props;
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalActual, setTotalActual] = useState(0);

  useEffect(() => {
    if (rowDisplayName === "Expense") {
      if (expenseBudgetSum) {
        setTotalBudget(expenseBudgetSum);
      }
      if (spendingSum) {
        setTotalActual(spendingSum);
      }
    } else {
      if (incomeSum) {
        setTotalActual(incomeSum);
      }
      let payBudget = 0;
      let otherBudget = 0;
      // Note that we need to check if the budget was specifically set to 0
      if (budgets) {
        if (budgets[payIncomeString]) {
          payBudget = budgets[payIncomeString];
        }
        if (budgets[otherIncomeString]) {
          otherBudget = budgets[otherIncomeString];
        }
        // We should cast propBudget to a string since the rest of the component assumes it is a string
        setTotalBudget(payBudget + otherBudget);
      }
    }
  }, [budgets, expenseBudgetSum, spendingSum, rowDisplayName, incomeSum]);

  return (
    <tr>
      <td>{rowDisplayName + " Total"}</td>
      <td></td>
      <td>{currencyFormatter.format(totalBudget)}</td>
      <td>{currencyFormatter.format(totalActual)}</td>
    </tr>
  );
};

const mapStateToProps = (state) => ({
  budgets: state.auth.budgets,
  expenseBudgetSum: state.auth.expenseBudgetSum,
  incomeSum: state.plaid.incomeSum,
  spendingSum: state.plaid.spendingSum,
});
const mapDispatchToProps = {};

// Note that there is probably a better way to do this with React hooks now
export default connect(mapStateToProps, mapDispatchToProps)(PlanTotalRow);
