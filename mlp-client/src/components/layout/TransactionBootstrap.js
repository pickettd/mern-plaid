import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { getAccounts, getTransactions } from "../../actions/accountActions";

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
  const { accounts, getAccounts, accountsLoading } = props;
  useEffect(() => {
    if (accounts && accounts.length === 0) {
      getAccessTokenSilently().then((accessToken) => {
        getAccounts(accessToken, accounts);
      });
    }
  }, [accounts, getAccessTokenSilently, getAccounts]);
  return accountsLoading ? <></> : <UseTransactionBootstrap />;
};

const accountStateToProps = (state) => ({
  accounts: state.plaid.accounts,
  accountsLoading: state.plaid.accountsLoading,
});
const accountDispatchToProps = {
  getAccounts,
};

export default connect(
  accountStateToProps,
  accountDispatchToProps
)(AccountBootstrap);
