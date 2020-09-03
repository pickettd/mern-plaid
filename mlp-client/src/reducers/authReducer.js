import {
  SET_CURRENT_USER,
  USER_LOADING,
  SET_BUDGETS,
  GET_USER_INFO,
  SET_SPEND_RANGE_DAYS_SELECTED,
} from "../actions/types";
import { AUTH_MOCK_DATA } from "./reduxMockData";

const isEmpty = require("is-empty");
// Try loading some demo/example data
const initialState = AUTH_MOCK_DATA;
// Below here is the normal initial state
/*const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  budgets: {},
  categoryMap: {},
};*/

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_BUDGETS:
      return {
        ...state,
        budgets: action.payload.allBudgets,
        expenseBudgetSum: action.payload.expenseBudgetSum,
      };
    case GET_USER_INFO:
      return {
        ...state,
        ...action.payload,
      };
    case SET_SPEND_RANGE_DAYS_SELECTED:
      return {
        ...state,
        spendRangeDays: action.payload,
      };
    default:
      return state;
  }
}
