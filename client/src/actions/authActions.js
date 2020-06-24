import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING, SET_BUDGETS, SET_CATEGORY_MAP } from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const saveUserBudget = budgetData => dispatch => {
  axios
    .post(`/api/users/budgets`, budgetData)
    .then(res => {
      let allBudgets = {};
      if (localStorage.allBudgets) {
        allBudgets = JSON.parse(localStorage.allBudgets);
      }
      const userId = res.data.userId
      allBudgets[userId] = res.data.budgets;
      localStorage.allBudgets = JSON.stringify(allBudgets);
      dispatch(setCurrentBudgets(allBudgets[userId]));
    })
    .catch(err => {
      let toSend = err;
      if (err.response) {
         toSend = err.response.data;
      }
      dispatch({
        type: GET_ERRORS,
        payload: toSend
      })}
    );
}

export const saveUserCategoryMap = catMapData => dispatch => {
  let allCatMaps = {};
  if (localStorage.allCatMaps) {
    allCatMaps = JSON.parse(localStorage.allCatMaps);
  }
  const userId = catMapData.userId
  if (!allCatMaps[userId]) {
    allCatMaps[userId] = {};
  }
  allCatMaps[userId][catMapData.bankCategoryName] = catMapData.newCategoryName;

  localStorage.allCatMaps = JSON.stringify(allCatMaps);
  dispatch(setCurrentCategoryMap(allCatMaps[userId]));
  //Communication with server disabled for the moment
  /*
  axios
    .post(`/api/users/categories`, catMapData)
    .then(res => {
      let allCatMaps = {};
      if (localStorage.allCatMaps) {
        allCatMaps = JSON.parse(localStorage.allCatMaps);
      }
      const userId = res.data.userId
      allCatMaps[userId] = res.data.categoryMap;
      localStorage.allCatMaps = JSON.stringify(allCatMaps);
      dispatch(setCurrentCategoryMap(allCatMaps[userId]));
    })
    .catch(err => {
      let toSend = err;
      if (err.response) {
         toSend = err.response.data;
      }
      dispatch({
        type: GET_ERRORS,
        payload: toSend
      })}
    );
    */
}

// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save to localStorage

      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      let allBudgets = {};
      if (localStorage.allBudgets) {
        allBudgets = JSON.parse(localStorage.allBudgets);
      }
      allBudgets[decoded.id] = decoded.budgets;
      localStorage.allBudgets = JSON.stringify(allBudgets);
      // Set current user
      dispatch(setCurrentUser(decoded));
      dispatch(setCurrentBudgets(decoded.budgets));
    })
    .catch(err => {
      let toSend = err;
      if (err.response) {
         toSend = err.response.data;
      }
      dispatch({
        type: GET_ERRORS,
        payload: toSend
      })}
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Set logged in user budgets
export const setCurrentBudgets = budgets => {
  return {
    type: SET_BUDGETS,
    payload: budgets
  };
};

// Set logged in user category map
export const setCurrentCategoryMap = categoryMap => {
  return {
    type: SET_CATEGORY_MAP,
    payload: categoryMap
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
