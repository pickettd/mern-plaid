import {
  ADD_ACCOUNT,
  REFRESH_ACCOUNT,
  UPDATE_ACCOUNT,
  DELETE_ACCOUNT,
  GET_ACCOUNTS,
  ACCOUNTS_LOADING,
  GET_TRANSACTIONS,
  TRANSACTIONS_LOADING,
  SET_TRANSACTION_DATA,
  USER_FIRST_VISIT,
} from "../actions/types";

import { PLAID_MOCK_DATA } from "./reduxMockData";

// Try loading some demo/example data
const initialState = PLAID_MOCK_DATA;
if (process.env.REACT_APP_LIVEDATA === "true") {
  initialState.accounts = [];
  initialState.transactions = [];
  initialState.accountsLoading = true;
  initialState.transactionsLoading = true;
  initialState.userFirstVisit = false;
}
// Below here is the normal initial state
/*const initialState = {
  accounts: [],
  transactions: [],
  accountsLoading: false,
  transactionsLoading: false,
  incomeSum: 0.00,
  spendingSum: 0.00,
  totalTransactionCount: 0,
  reviewedTransactionCount: 0,
  categoriesThisSpendRange: [],
  spendingByCategory: {},
};*/

export default function (state = initialState, action) {
  switch (action.type) {
    case ACCOUNTS_LOADING:
      return {
        ...state,
        accountsLoading: true,
      };
    case ADD_ACCOUNT:
      return {
        ...state,
        accounts: [...state.accounts, action.payload],
        accountsLoading: false,
        userFirstVisit: false,
      };
    // The payload to refresh an account is the same account (or new account)
    case REFRESH_ACCOUNT:
      return {
        ...state,
        accounts: state.accounts.map((account) => {
          if (account.institutionId !== action.payload) {
            return account;
          } else {
            return {
              ...account,
              toRefresh: false,
            };
          }
        }),
      };
    // The payload to update an account is the newly edited account
    case UPDATE_ACCOUNT:
      return {
        ...state,
        accounts: state.accounts.map((account) => {
          if (account._id !== action.payload._id) {
            return account;
          } else {
            return {
              ...action.payload,
            };
          }
        }),
      };
    case DELETE_ACCOUNT:
      return {
        ...state,
        accounts: state.accounts.filter(
          (account) => account._id !== action.payload
        ),
      };
    case GET_ACCOUNTS:
      return {
        ...state,
        accounts: action.payload,
        accountsLoading: false,
      };
    case TRANSACTIONS_LOADING:
      return {
        ...state,
        transactionsLoading: true,
      };
    case GET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
        transactionsLoading: false,
      };
    // NOTE: this is not the redux way, this should be designed differently in next refactor
    case SET_TRANSACTION_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case USER_FIRST_VISIT:
      return {
        ...state,
        userFirstVisit: true,
      };
    default:
      return state;
  }
}
