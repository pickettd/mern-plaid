import React, { Component } from "react";
import PropTypes from "prop-types";
import PlaidLinkButton from "react-plaid-link-button";
import { connect } from "react-redux";
import {
  getTransactions,
  addAccount,
  deleteAccount
} from "../../actions/accountActions";
import { logoutUser } from "../../actions/authActions";
//import MaterialTable from "material-table"; // https://mbrn.github.io/material-table/#/
import MUIDataTable from "mui-datatables"; // https://github.com/gregnb/mui-datatables

class Accounts extends Component {
  componentDidMount() {
    const { accounts } = this.props;
    this.props.getTransactions(accounts);
  }

  // Add account
  handleOnSuccess = (token, metadata) => {
    const { accounts } = this.props;
    const plaidData = {
      public_token: token,
      metadata: metadata,
      accounts: accounts
    };

    this.props.addAccount(plaidData);
  };

  // Delete account
  onDeleteClick = id => {
    const { accounts } = this.props;
    const accountData = {
      id: id,
      accounts: accounts
    };
    this.props.deleteAccount(accountData);
  };

  // Logout
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user, accounts } = this.props;
    const { transactions, transactionsLoading } = this.props.plaid;

    let accountItems = accounts.map(account => (
      <li key={account._id} style={{ marginTop: "1rem" }}>
        <button
          style={{ marginRight: "1rem" }}
          onClick={this.onDeleteClick.bind(this, account._id)}
          className="btn btn-flat btn-floating waves-effect waves-light blue lighten-2 hoverable"
        >
          <i className="material-icons">delete</i>
        </button>
        <b>{account.institutionName}</b>
      </li>
    ));

    // Setting up data table
    /*const transactionsColumns = [
      { title: "Account", field: "account" },
      { title: "Date", field: "date", type: "date", defaultSort: "desc" },
      { title: "Name", field: "name" },
      { title: "Amount", field: "amount", type: "numeric" },
      { title: "Category", field: "category" }
    ];*/
    // Setting up mui table
    const transactionMUIColumns = [
      { label: "Account", name: "account" },
      { label: "Date", name: "date", options: {sortDirection: "desc"} },
      { label: "Name", name: "name" },
      { label: "Amount", name: "amount"},
      { label: "Category", name: "category" }
    ];
    const optionsMUI = {
      filterType: 'checkbox',
      selectableRows: 'none'
    };

    let transactionsData = [];
    transactions.forEach(function(account) {
      account.transactions.forEach(function(transaction) {
        transactionsData.push({
          account: account.accountName,
          date: transaction.date,
          category: transaction.category[0],
          name: transaction.name,
          amount: transaction.amount
        });
      });
    });

    return (
      <div>
        <div class="container header-elements">
          <h4 class="greeting">
            <b>Aloha {user.name.split(" ")[0]}</b>
          </h4>
          <button
            onClick={this.onLogoutClick}
            className="btn-flat blue lighten-2 waves-effect logout"
          >
            Sign Out
          </button>
        </div>
        <div className="row">
          <div className="col s12">
            <h5>
              <b>Linked Accounts</b>
            </h5>
            <p className="grey-text text-darken-1 helper">
              Add or remove your bank accounts below
            </p>
            <div class="row">
              <div class="col s6 bank-accounts">
            <ul>{accountItems}</ul>
            <PlaidLinkButton
              buttonProps={{
                className:
                  "btn-flat waves-effect waves-light hoverable add-account main-btn"
              }}
              plaidLinkProps={{
                clientName: process.env.REACT_APP_NAME,
                key: process.env.REACT_APP_PLAID_PUBLIC_KEY,
                env: process.env.REACT_APP_PLAID_ENV_STRING,
                product: ["transactions"],
                onSuccess: this.handleOnSuccess
              }}
              onScriptLoad={() => this.setState({ loaded: true })}
            >
              + Add Account
            </PlaidLinkButton>
              </div>
            </div>
              <hr style={{ marginTop: "2rem", opacity: "0" }} />
            <h5>
              <b>Transactions</b>
            </h5>
            {transactionsLoading ? (
              <p className="grey-text text-darken-1">Fetching transactions...</p>
            ) : (
              <>
                <p className="grey-text text-darken-1 helper">
                  You have <b>{transactionsData.length}</b> transactions from your
                  <b> {accounts.length}</b> linked
                  {accounts.length > 1 ? (
                    <span> accounts </span>
                  ) : (
                    <span> account </span>
                  )}
                  from the past 30 days
                </p>
                <MUIDataTable
                  title={"Search Transactions"}
                  data={transactionsData}
                  columns={transactionMUIColumns}
                  options={optionsMUI}
                />
                {/*<MaterialTable
                  columns={transactionsColumns}
                  data={transactionsData}
                  title="Search Transactions"
                />*/}
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

Accounts.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  getTransactions: PropTypes.func.isRequired,
  addAccount: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  accounts: PropTypes.array.isRequired,
  plaid: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  plaid: state.plaid
});

export default connect(
  mapStateToProps,
  { logoutUser, getTransactions, addAccount, deleteAccount }
)(Accounts);
