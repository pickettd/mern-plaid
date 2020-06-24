import { SET_CURRENT_USER, USER_LOADING, SET_BUDGETS, SET_CATEGORY_MAP } from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  budgets: {},
  categoryMap: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    case SET_BUDGETS:
      return {
        ...state,
        budgets: action.payload
      };
    case SET_CATEGORY_MAP:
      return {
        ...state,
        categoryMap: action.payload
      };
    default:
      return state;
  }
}
