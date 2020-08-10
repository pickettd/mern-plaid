import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getTransactions,
  addAccount,
  refreshAccount,
  deleteAccount,
} from "../../actions/accountActions";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
import UserProfile from "../profile/UserProfile";
import currencyFormatter from "../../utils/currencyFormatter";
import percentFormatter from "../../utils/percentFormatter";
import SpendRangeHeader from "../layout/SpendRangeHeader";

class SpendStory extends Component {
  render() {
    const { plaid } = this.props;
    const connectedBankAccounts = plaid.accounts.map((account) => (
      <div key={account._id}>Account Name here: {account.institutionName}</div>
    ));
    return (
      <>
        <div>
          <SpendRangeHeader
            mainHeaderText={this.props.userName + "'s"}
            subHeaderText="Spend Story"
          />
          <div className="section income-spend">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-sm-4">
                  <div className="container text-md-left">
                    <h1>
                      <span className="small top">Income</span>
                      <br />
                      {currencyFormatter.format(plaid.incomeSum)}
                    </h1>
                    <h3>
                      <span className="small top">Paycheck</span>
                      <br />
                      $300
                    </h3>
                    <h3>
                      <span className="small top">Other Source</span>
                      <br />
                      $300
                    </h3>
                  </div>
                </div>

                <div className="col-sm-4">
                  <div className="container text-md-right">
                    <h1>
                      <span className="small top">Spent</span>
                      <br />
                      {currencyFormatter.format(plaid.spendingSum)}
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
                  <Link to="/manage-transactions" className="btn">
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
                      <h1>
                        Spending Plan
                        <br />
                        <span className="small bottom">Breakdown</span>
                      </h1>
                    </div>
                    <div className="row">
                      <h3>
                        {currencyFormatter.format(
                          plaid.incomeSum - plaid.spendingSum
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
                  <h3>
                    $300
                    <br />
                    <span className="small bottom">budget estimate</span>
                  </h3>
                </div>
              </div>
              <div className="row">
                <div className="col-8">
                  <h4>
                    On track
                    <br />
                    <span className="small bottom">7 categories</span>
                  </h4>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 col-sm-6">
                  <div className="card card-blog">
                    <div className="card-image">
                      <img className="img" alt="Category Name" />
                      <h5>Category Name</h5>
                    </div>
                    <div className="card-body text-center">
                      <h4 className="card-title text-left">
                        $200
                        <span className="small bottom">
                          <br />
                          Available
                        </span>
                      </h4>
                      <div className="card-description">graph</div>
                      <div className="card-footer">
                        <div className="row">
                          <div className="col">
                            <p className=" text-left">
                              $200
                              <span className="small bottom">
                                <br />
                                Budget
                              </span>
                            </p>
                          </div>
                          <div className="col">
                            <p className=" text-left">
                              $200
                              <span className="small bottom">
                                <br />
                                Spent
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
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
                  <h2>
                    <span className="small top">Savings</span>
                    <br />
                    $522
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
  userName: state.auth.user.name,
});

export default connect(mapStateToProps, {
  logoutUser,
  getTransactions,
  addAccount,
  deleteAccount,
  refreshAccount,
})(SpendStory);
