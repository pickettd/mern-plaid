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

class SpendStory extends Component {
  render() {
    const accountItems = this.props.plaid.accounts.map((account) => (
      <div key={account._id}>Account Name here: {account.institutionName}</div>
    ));
    return (
      <>
        <div>
          <span>This is the Spend Story</span>
          {accountItems}
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
