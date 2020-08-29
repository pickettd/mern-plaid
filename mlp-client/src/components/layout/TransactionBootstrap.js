import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { getAccounts, getTransactions } from "../../actions/accountActions.js";
import { getUserInfo } from "../../actions/authActions.js";

const TransactionBootstrap = (props) => {
  const { getAccessTokenSilently } = useAuth0();
  const { accounts, getTransactions, transactions } = props;
  useEffect(() => {
    if (transactions && transactions.length === 0) {
      getAccessTokenSilently().then((accessToken) => {
        getTransactions(accessToken, accounts);
      });
    }
  }, [accounts, getAccessTokenSilently, getTransactions, transactions]);
  return <></>;
};

const transactionStateToProps = (state) => ({
  accounts: state.plaid.accounts,
  transactions: state.plaid.transactions,
});
const transactionDispatchToProps = {
  getTransactions,
};

const UseTransactionBootstrap = connect(
  transactionStateToProps,
  transactionDispatchToProps
)(TransactionBootstrap);

const AccountBootstrap = (props) => {
  const { getAccessTokenSilently } = useAuth0();
  const { accounts, getAccounts, accountsLoading, getUserInfo } = props;
  useEffect(() => {
    if (accounts && accounts.length === 0) {
      getAccessTokenSilently().then((accessToken) => {
        getUserInfo(accessToken);
        getAccounts(accessToken, accounts);
      });
    }
  }, [accounts, getAccessTokenSilently, getAccounts, getUserInfo]);
  return accountsLoading ? <></> : <UseTransactionBootstrap />;
};

const accountStateToProps = (state) => ({
  accounts: state.plaid.accounts,
  accountsLoading: state.plaid.accountsLoading,
});
const accountDispatchToProps = {
  getAccounts,
  getUserInfo,
};

export default connect(
  accountStateToProps,
  accountDispatchToProps
)(AccountBootstrap);
