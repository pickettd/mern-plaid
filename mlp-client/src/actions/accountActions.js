import axios from "axios";

import {
  ADD_ACCOUNT,
  UPDATE_ACCOUNT,
  REFRESH_ACCOUNT,
  DELETE_ACCOUNT,
  GET_ACCOUNTS,
  ACCOUNTS_LOADING,
  GET_TRANSACTIONS,
  TRANSACTIONS_LOADING,
} from "./types";

const setAxiosAuth = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// Add account
export const addAccount = (accessToken, plaidData) => (dispatch) => {
  const accounts = plaidData.accounts;
  if (accessToken) {
    setAxiosAuth(accessToken);
  }
  axios
    .post("/api/plaid/accounts/add", plaidData)
    .then((res) =>
      dispatch({
        type: ADD_ACCOUNT,
        payload: res.data,
      })
    )
    .then((data) =>
      //return null;
      accounts
        ? dispatch(getTransactions(accessToken, accounts.concat(data.payload)))
        : null
    )
    .catch((err) => console.log(err));
};

// Refresh account
export const refreshAccount = (plaidData) => (dispatch) => {
  const id = plaidData.metadata.institution.institution_id;
  const accounts = plaidData.accounts;
  axios
    .post(`/api/plaid/accounts/refresh/${id}`, plaidData)
    .then((res) =>
      dispatch({
        type: REFRESH_ACCOUNT,
        payload: id,
      })
    )
    .then((data) => (accounts ? dispatch(getTransactions(accounts)) : null))
    .catch((err) => console.log(err));
};

// Delete account
export const deleteAccount = (plaidData) => (dispatch) => {
  if (window.confirm("Are you sure you want to remove this account?")) {
    const id = plaidData.id;
    const newAccounts = plaidData.accounts.filter(
      (account) => account._id !== id
    );
    axios
      .delete(`/api/plaid/accounts/${id}`)
      .then((res) =>
        dispatch({
          type: DELETE_ACCOUNT,
          payload: id,
        })
      )
      .then(newAccounts ? dispatch(getTransactions(newAccounts)) : null)
      .catch((err) => console.log(err));
  }
};

// Get all accounts for specific user with Auth0
export const getAccounts = (accessToken) => (dispatch) => {
  if (accessToken) {
    setAxiosAuth(accessToken);
  }
  dispatch(setAccountsLoading());
  axios
    .get("/api/plaid/accounts")
    .then((res) =>
      dispatch({
        type: GET_ACCOUNTS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ACCOUNTS,
        payload: null,
      })
    );
};

// Accounts loading
export const setAccountsLoading = () => {
  return {
    type: ACCOUNTS_LOADING,
  };
};

// Get Transactions with Auth0
export const getTransactions = (accessToken, plaidData) => (dispatch) => {
  if (accessToken) {
    setAxiosAuth(accessToken);
  }
  dispatch(setTransactionsLoading());
  axios
    .post("/api/plaid/accounts/transactions", plaidData)
    .then((res) => {
      // Need to check if there are transactions?
      if (res.data.transactions) {
        dispatch({
          type: GET_TRANSACTIONS,
          payload: res.data.transactions,
        });
      } else {
        // Should throw no a tranasactions error here
      }
      if (res.data.needUpdate && res.data.needUpdate.length) {
        res.data.needUpdate.forEach(function (account) {
          dispatch({
            type: UPDATE_ACCOUNT,
            payload: account,
          });
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: GET_TRANSACTIONS,
        payload: null,
      });
    });
};

// Transactions loading
export const setTransactionsLoading = () => {
  return {
    type: TRANSACTIONS_LOADING,
  };
};
