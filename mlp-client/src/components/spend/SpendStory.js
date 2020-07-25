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

class SpendStory extends Component {
  render() {
    const { plaid } = this.props;
    const connectedBankAccounts = plaid.accounts.map((account) => (
      <div key={account._id}>Account Name here: {account.institutionName}</div>
    ));
    return (
      <>
        <div>
          <UserProfile />
          <div>-----------------------</div>
          <div>This is the Spend Story</div>
          <div>Here's a list of our connected bank accounts</div>
          {connectedBankAccounts}
          <div>-----------------------</div>
          <div>
            Your income total is {currencyFormatter.format(plaid.incomeSum)}
          </div>
          <div>
            Your spending total is {currencyFormatter.format(plaid.spendingSum)}
          </div>
          <div>
            So your profit for this period is{" "}
            {currencyFormatter.format(plaid.incomeSum - plaid.spendingSum)}
          </div>
          <ul>
            <li>
              <Link to="/manage-transactions">Manage Transactions</Link>
            </li>
            <li>
              <Link to="/spend-plan">Spend Plan</Link>
            </li>
          </ul>
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
});

export default connect(mapStateToProps, {
  logoutUser,
  getTransactions,
  addAccount,
  deleteAccount,
  refreshAccount,
})(SpendStory);
