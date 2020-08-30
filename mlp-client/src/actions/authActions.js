import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  SET_BUDGETS,
  SET_TRANSACTION_DATA,
  GET_USER_INFO,
  TRANSACTIONS_LOADING,
  GET_TRANSACTIONS,
} from "./types";
import {
  updateSortedCategories,
  processTransactionList,
} from "../utils/processTransactionList.js";

const setAxiosAuth = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// Register User
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("/api/users/register", userData)
    .then((res) => history.push("/login"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const saveUserBudget = (accessToken, budgetData) => (
  dispatch,
  getState
) => {
  const state = getState();
  if (accessToken) {
    setAxiosAuth(accessToken);
  }
  const { categoriesThisSpendRange, spendingByCategory } = state.plaid;
  const { expenseBudgetSum } = state.auth;
  let oldBudgetAmount = 0;
  if (state.auth.budgets[budgetData.name]) {
    oldBudgetAmount = state.auth.budgets[budgetData.name];
  }
  const newBudgetAmount = budgetData.payload[budgetData.name];
  const allBudgets = { ...state.auth.budgets, ...budgetData.payload };
  const newBudgetSum = expenseBudgetSum - oldBudgetAmount + newBudgetAmount;
  const budgetPayload = {
    allBudgets,
    expenseBudgetSum: newBudgetSum,
  };
  dispatch(setCurrentBudgets(budgetPayload));
  const sortedCategories = updateSortedCategories(
    categoriesThisSpendRange,
    spendingByCategory,
    allBudgets
  );
  const updateTransactions = {
    sortedCategoriesOverBudget: sortedCategories.overBudgets,
    sortedCategoriesUnderBudget: sortedCategories.underBudgets,
  };
  dispatch({
    type: SET_TRANSACTION_DATA,
    payload: updateTransactions,
  });
  // Note: if we leave this api call in this position for now, the demo for frontend-only
  // will continue to work but the downside is that if there is a
  // server error then the frontend and backend could get out of sync.
  // So that is why the axios.then statement just returns (since we handle frontend updates before)
  axios
    .post(`/api/users/budgets`, {
      budgetName: budgetData.name,
      budgetAmount: newBudgetAmount,
      expenseBudgetSum: newBudgetSum,
    })
    .then((res) => {
      //dispatch(setCookiesAndCurrentBudgets(res.data.userId, res.data.budgets));
      return res;
    })
    .catch((err) => {
      let toSend = err;
      if (err.response) {
        toSend = err.response.data;
      }
      dispatch({
        type: GET_ERRORS,
        payload: toSend,
      });
    });
};

// Login - get user token
export const loginUser = (userData) => (dispatch) => {
  axios
    .post("/api/users/login", userData)
    .then((res) => {
      // Save to localStorage

      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
      //dispatch(setCookiesAndCurrentBudgets(decoded.id, decoded.budgets));
    })
    .catch((err) => {
      let toSend = err;
      if (err.response) {
        toSend = err.response.data;
      }
      dispatch({
        type: GET_ERRORS,
        payload: toSend,
      });
    });
};

export const setCategory = (accessToken, transactionData) => (
  dispatch,
  getState
) => {
  const state = getState();

  const transactionID = transactionData.transactionID;
  const newCategoryName = transactionData.newMainCategory;

  // NOTE, don't think I have to do this if just use return of object from server
  // for the dispatch payload - however as mentioned in budgetData, doing it this
  // way lets frontend-only deployment continue to work
  // ------------------------------------------------------------------------
  const { perTransactionSettings } = state.auth;
  let payloadArray = [];
  let newTransactionSettings = { ...perTransactionSettings };
  if (perTransactionSettings && perTransactionSettings[transactionID]) {
    newTransactionSettings = {
      ...perTransactionSettings[transactionID],
    };
    if (perTransactionSettings[transactionID].userCategories) {
      payloadArray = [...perTransactionSettings[transactionID].userCategories];
    }
  } else {
    newTransactionSettings[transactionID] = {};
  }
  payloadArray[0] = newCategoryName;
  newTransactionSettings[transactionID].userCategories = payloadArray;

  // ------------------------------------------------------------------------
  dispatch({
    type: GET_USER_INFO,
    payload: { newTransactionSettings },
  });

  // Send to server and use the new full transactionSettings

  if (accessToken) {
    setAxiosAuth(accessToken);
  }

  axios
    .post(`/api/users/new-transaction-settings`, {
      transactionID,
      settingData: newTransactionSettings[transactionID],
    })
    .then((res) => {
      // Dispatch GET_USER_INFO is already done above
      return res;
    })
    .catch((err) => {
      let toSend = err;
      if (err.response) {
        toSend = err.response.data;
      }
      dispatch({
        type: GET_ERRORS,
        payload: toSend,
      });
    });

  // Ok - get the transaction list from state, copy it to a new variable,
  // update category, and call to reprocess
  // I THINK I COULD SIMPLIFY ALL OF THIS BY RETURNING TRANSACTIONS FROM SERVER
  // although, reprocessing on the server would mean either passing the server the
  // list of transactions or fetching from Plaid a fresh list
  // ------------------------------------------------------------------------
  const { transactions } = state.plaid;
  const newTransactionList = [...transactions];
  dispatch({
    type: TRANSACTIONS_LOADING,
  });
  for (
    let accountIndex = 0;
    accountIndex < newTransactionList.length;
    accountIndex++
  ) {
    const account = newTransactionList[accountIndex];
    const newInnerTransactions = [...account.transactions];
    for (
      let transIndex = 0;
      transIndex < newInnerTransactions.length;
      transIndex++
    ) {
      const transaction = newInnerTransactions[transIndex];

      if (transaction.transaction_id === transactionID) {
        const newTransaction = {
          ...transaction,
        };
        const newCategories = [...newTransaction.category];
        newCategories[0] = newCategoryName;
        newTransaction.category = newCategories;
        newInnerTransactions[transIndex] = newTransaction;
        newTransactionList[accountIndex] = {
          ...newTransactionList[accountIndex],
          transactions: newInnerTransactions,
        };
        transIndex = newInnerTransactions.length;
        accountIndex = newTransactionList.length;
      }
    }
  }
  // then dispatch process transaction list
  dispatch(processTransactionList(newTransactionList, state.auth.budgets));
  dispatch({
    type: GET_TRANSACTIONS,
    payload: newTransactionList,
  });
  // ------------------------------------------------------------------------
};

// userInfo - get user info for logged in user
export const getUserInfo = (accessToken) => (dispatch) => {
  if (accessToken) {
    setAxiosAuth(accessToken);
  }
  axios
    .get("/api/users/user-info")
    .then((res) => {
      const returnedUser = res.data;
      const {
        budgets,
        expenseBudgetSum,
        spendRangeDays,
        perTransactionSettings,
      } = returnedUser;
      const payload = {
        budgets,
        expenseBudgetSum,
        spendRangeDays,
        perTransactionSettings,
      };

      dispatch({
        type: GET_USER_INFO,
        payload,
      });
    })
    .catch((err) => {
      if (err.response.status === 400) {
        console.log("Error 400 indicates user hasn't added any settings yet");
      }
      let toSend = err;
      if (err.response) {
        toSend = err.response.data;
      }
      dispatch({
        type: GET_ERRORS,
        payload: toSend,
      });
    });
};

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// Set logged in user budgets
export const setCurrentBudgets = (budgetPayload) => {
  return {
    type: SET_BUDGETS,
    payload: budgetPayload,
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

// Log user out
export const logoutUser = () => (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
