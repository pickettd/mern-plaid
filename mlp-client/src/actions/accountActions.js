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

import processTransactionList from "../utils/processTransactionList.js";

const setAxiosAuth = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// Add account
export const addAccount = (accessToken, plaidData) => (dispatch, getState) => {
  const state = getState();
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
    .then((data) => {
      if (state.plaid.accounts) {
        return dispatch(
          getTransactions(
            accessToken,
            state.plaid.accounts.concat(data.payload)
          )
        );
      } else {
        return null;
      }
    })
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
    .catch((err) => {
      console.log("Error 400 indicates user hasn't added any accounts yet");
    });
};

// Accounts loading
export const setAccountsLoading = () => {
  return {
    type: ACCOUNTS_LOADING,
  };
};

// Get Transactions with Auth0
export const getTransactions = (accessToken, plaidData) => (
  dispatch,
  getState
) => {
  if (accessToken) {
    setAxiosAuth(accessToken);
  }
  if (plaidData && plaidData.length !== 0) {
    dispatch(setTransactionsLoading());
    axios
      .post("/api/plaid/accounts/transactions", plaidData)
      .then((res) => {
        // Need to check if there are transactions?
        if (res.data.transactions) {
          const state = getState();
          dispatch(
            processTransactionList(res.data.transactions, state.auth.budgets)
          );
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
        console.log(err);
        dispatch({
          type: GET_TRANSACTIONS,
          payload: null,
        });
      });
  }
};

// Transactions loading
export const setTransactionsLoading = () => {
  return {
    type: TRANSACTIONS_LOADING,
  };
};
