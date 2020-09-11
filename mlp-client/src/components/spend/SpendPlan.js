import React from "react";
import Table from "react-bootstrap/Table";
import { connect } from "react-redux";
import Loading from "../../utils/loading.js";
import SpendPlanRow from "./SpendPlanRow.js";
import ColorHeader from "../layout/ColorHeader.js";
import PlanTotalRow from "./PlanTotalRow.js";
// This component has the starter code for an income section with dropdowns
//import UnusedIncomeBudget from "./UnusedIncomeBudget.js";

// Note that currently we get a category from plaid called "Income"
// Transactions that have just the category of "Income" are counted towards other income
// In the manage transaction page, we show "Income" to the user as "Income - Other"
// And we give the option to the user to recategorize as "Income - Paycheck"
const payIncomeString = "Income - Paycheck";
//const payIncomeDisplay = "Paycheck Total";
const otherIncomeString = "Income";
//const otherIncomeDisplay = "Other Income Total";

// Putting this structure outside of the class so the spendrow props
// don't change on budget save
const incomeCategories = [
  { name: payIncomeString },
  { name: otherIncomeString },
];

const SpendPlan = (props) => {
  const { budgets } = props;

  if (props.accountsLoading || props.transactionsLoading) {
    return <Loading />;
  }
  return (
    <>
      <ColorHeader
        mainHeaderText="Plan"
        subHeaderText="Kilo. To kilo means to star gaze. It also means to watch closely, observe and examine. Kilo is an important practice for mahi ʻai, lawaiʻa, and navigators. Here you can kilo your expenses for the month, examine where to assign kuleana to ensure waiwai. "
        colorClassName="section-header-green"
      />
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col">
              <h2>Income</h2>
              <Table hover>
                <thead>
                  <tr>
                    <th>Waiwai category</th>
                    <th></th>
                    <th>Income budget for {props.spendRangeDays} days</th>
                    <th>Earned last {props.spendRangeDays} days</th>
                  </tr>
                </thead>
                <tbody>
                  <PlanTotalRow rowDisplayName="Income" />
                  {incomeCategories.map((category) => {
                    return (
                      <SpendPlanRow
                        key={category.name}
                        category={category}
                        propBudget={budgets[category.name]}
                      ></SpendPlanRow>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
      <div className="section table-section">
        <div className="container">
          <div className="row">
            <div className="col">
              <h2>Expenses</h2>
              <Table hover>
                <thead>
                  <tr>
                    <th>Waiwai category</th>
                    <th></th>
                    <th>Expense budget for {props.spendRangeDays} days</th>
                    <th>Spent last {props.spendRangeDays} days</th>
                  </tr>
                </thead>
                <tbody>
                  <PlanTotalRow rowDisplayName="Expense" />
                  {props.categoriesThisSpendRange.map((category, i) => {
                    if (category.name.includes("Income")) {
                      return (
                        <React.Fragment key={category.name}></React.Fragment>
                      );
                    }
                    return (
                      <SpendPlanRow
                        key={category.name}
                        category={category}
                        propBudget={budgets[category.name]}
                      ></SpendPlanRow>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  budgets: state.auth.budgets,
  incomeSum: state.plaid.incomeSum,
  paycheckSum: state.plaid.paycheckSum,
  otherIncomeSum: state.plaid.otherIncomeSum,
  categoriesThisSpendRange: state.plaid.categoriesThisSpendRange,
  spendRangeDays: state.auth.spendRangeDays,
  accountsLoading: state.plaid.accountsLoading,
  transactionsLoading: state.plaid.transactionsLoading,
});
const mapDispatchToProps = {};

// Note that there is probably a better way to do this with React hooks now
export default connect(mapStateToProps, mapDispatchToProps)(SpendPlan);
