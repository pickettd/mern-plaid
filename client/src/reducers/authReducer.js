import { SET_CURRENT_USER, USER_LOADING, SET_BUDGETS } from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  budgets: {}
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
      console.log("in the set-budgets reducer, payload is")
      console.log(action.payload);
      return {
        ...state,
        budgets: action.payload
      };
    default:
      return state;
  }
}
