import {
  ADD_ACCOUNT,
  REFRESH_ACCOUNT,
  DELETE_ACCOUNT,
  GET_ACCOUNTS,
  ACCOUNTS_LOADING,
  GET_TRANSACTIONS,
  TRANSACTIONS_LOADING
} from "../actions/types";

const initialState = {
  accounts: [],
  transactions: [],
  accountsLoading: false,
  transactionsLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ACCOUNTS_LOADING:
      return {
        ...state,
        accountsLoading: true
      };
    case ADD_ACCOUNT:
      return {
        ...state,
        accounts: [action.payload, ...state.accounts]
      };
    case REFRESH_ACCOUNT:
      return {
        ...state,
        // Note - currently this reducer does nothing
        //accounts: state.accounts.filter(
        //  account => account._id !== action.payload
        //)
      };
    case DELETE_ACCOUNT:
      return {
        ...state,
        accounts: state.accounts.filter(
          account => account._id !== action.payload
        )
      };
    case GET_ACCOUNTS:
      return {
        ...state,
        accounts: action.payload,
        accountsLoading: false
      };
    case TRANSACTIONS_LOADING:
      return {
        ...state,
        transactionsLoading: true
      };
    case GET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
        transactionsLoading: false
      };
    default:
      return state;
  }
}
