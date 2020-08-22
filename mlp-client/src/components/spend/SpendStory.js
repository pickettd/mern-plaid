import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withAuth0 } from "@auth0/auth0-react";
import {
  getTransactions,
  addAccount,
  refreshAccount,
  deleteAccount,
} from "../../actions/accountActions";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
import { noDecimalCurrencyFormatter } from "../../utils/currencyFormatter";
import percentFormatter from "../../utils/percentFormatter";
import SpendRangeHeader from "../layout/SpendRangeHeader";
import SpendCategoryCard from "./SpendCategoryCard";

class SpendStory extends Component {
  render() {
    const { user } = this.props.auth0;
    const { name } = user;
    const { plaid, auth } = this.props;
    const connectedBankAccounts = plaid.accounts.map((account) => (
      <div key={account._id}>Account Name here: {account.institutionName}</div>
    ));
    return (
      <>
        <div>
          <SpendRangeHeader mainHeaderText={name} subHeaderText="Spend Story" />
          <div className="section income-spend">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-sm-4">
                  <div className="container text-md-left">
                    <h1 className="large-number">
                      <span className="small top">Income</span>
                      <br />
                      {noDecimalCurrencyFormatter.format(plaid.incomeSum)}
                    </h1>
                    <h3>
                      <span className="small top">Paycheck</span>
                      <br />
                      {noDecimalCurrencyFormatter.format(plaid.paycheckSum)}
                    </h3>
                    <h3>
                      <span className="small top">Other Source</span>
                      <br />
                      {noDecimalCurrencyFormatter.format(plaid.otherIncomeSum)}
                    </h3>
                  </div>
                </div>

                <div className="col-sm-4">
                  <div className="container text-md-right">
                    <h1 className="large-number">
                      <span className="small top">Spent</span>
                      <br />
                      {noDecimalCurrencyFormatter.format(plaid.spendingSum)}
                    </h1>
                    <h3>
                      <span className="small top">Transactions</span>
                      <br />
                      {plaid.totalTransactionCount}
                    </h3>
                    <h3>
                      <span className="small top">Transactions reviewed</span>
                      <br />
                      {percentFormatter.format(
                        plaid.reviewedTransactionCount /
                          plaid.totalTransactionCount
                      )}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-sm-4 text-center">
                  <Link to="/manage-transactions" className="btn mt-4">
                    view transactions
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="section section-spending-plan">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <div className="container">
                    <div className="row">
                      <h1 className="darktext">
                        Spending Plan
                        <br />
                        <span className="small bottom">Breakdown</span>
                      </h1>
                    </div>
                    <div className="row mt-5 mb-3">
                      <h3 className="large-number">
                        {/* Note, Joe's explanation of budget available is
                        supposed to be what you earned last 30 days versus what you
                        budgeted to spend for 30 days */}
                        {noDecimalCurrencyFormatter.format(
                          plaid.incomeSum - auth.expenseBudgetSum
                        )}
                        <br />
                        <span className="small bottom">budget available</span>
                      </h3>
                    </div>
                    <div className="row">
                      <Link to="/spend-plan" className="btn">
                        manage spend plan
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="section section-spend-categories">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <h1>Spend Plan</h1>
                </div>
                <div className="col-md-6 text-md-right">
                  <h3 className="large-number">
                    {/* Note, Joe's explanation of budget estimate is
                        supposed to be the sum of all the expense budgets */}
                    {noDecimalCurrencyFormatter.format(auth.expenseBudgetSum)}
                    <br />
                    <span className="small bottom">budget estimate</span>
                  </h3>
                </div>
              </div>
              <div className="row">
                <div className="col-8 pt-4 pb-4">
                  <h4>
                    On track
                    <br />
                    <span className="small bottom">
                      {plaid.sortedCategoriesUnderBudget.length}
                      {plaid.sortedCategoriesUnderBudget.length === 1
                        ? " category"
                        : " catiegories"}
                    </span>
                  </h4>
                </div>
              </div>
              <div className="row">
                {plaid.sortedCategoriesUnderBudget.map((categoryName, i) => {
                  return (
                    <div key={i} className="col-lg-3 col-md-4 col-sm-6">
                      <SpendCategoryCard
                        categoryName={categoryName}
                        underBudget={true}
                        budgetAmount={auth.budgets[categoryName]}
                        spentAmount={plaid.spendingByCategory[categoryName]}
                      ></SpendCategoryCard>
                    </div>
                  );
                })}
              </div>
              <div className="row">
                <div className="col-8 pt-4 pb-4">
                  <h4>
                    Needs Work
                    <br />
                    <span className="small bottom">
                      {plaid.sortedCategoriesOverBudget.length}
                      {plaid.sortedCategoriesOverBudget.length === 1
                        ? " category"
                        : " catiegories"}
                    </span>
                  </h4>
                </div>
              </div>
              <div className="row">
                {plaid.sortedCategoriesOverBudget.map((categoryName, i) => {
                  return (
                    <div key={i} className="col-lg-3 col-md-4 col-sm-6">
                      <SpendCategoryCard
                        categoryName={categoryName}
                        underBudget={false}
                        budgetAmount={auth.budgets[categoryName]}
                        spentAmount={plaid.spendingByCategory[categoryName]}
                      ></SpendCategoryCard>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="section section-spend-plan-footer">
            <div className="container">
              <div className="row mt-5">
                <div className="col-md-6 offset-md-1">
                  <h2 className="large-number">
                    <span className="small top">Savings</span>
                    <br />
                    {noDecimalCurrencyFormatter.format(
                      plaid.incomeSum - plaid.spendingSum
                    )}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

SpendStory.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  getTransactions: PropTypes.func.isRequired,
  addAccount: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  refreshAccount: PropTypes.func.isRequired,
  plaid: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  plaid: state.plaid,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  logoutUser,
  getTransactions,
  addAccount,
  deleteAccount,
  refreshAccount,
})(withAuth0(SpendStory));
