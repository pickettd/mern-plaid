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
} from "./types";
import { updateSortedCategories } from "../utils/processTransactionList.js";

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
  // server error then the frontend and backend could get out of sync

  axios
    .post(`/api/users/budgets`, {
      budgetName: budgetData.name,
      budgetAmount: newBudgetAmount,
      expenseBudgetSum: newBudgetSum,
    })
    .then((res) => {
      //dispatch(setCookiesAndCurrentBudgets(res.data.userId, res.data.budgets));
      return;
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
