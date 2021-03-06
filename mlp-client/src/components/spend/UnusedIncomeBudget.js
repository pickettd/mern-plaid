import React, { /*useState,*/ useReducer, useEffect, useCallback } from "react";
import Table from "react-bootstrap/Table";
import { connect } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../../utils/loading.js";
import { currencyFormatter } from "../../utils/currencyFormatter";
import { saveUserBudget } from "../../actions/authActions";

// Note that currently we get a category from plaid called "Income"
// Transactions that have just the category of "Income" are counted towards other income
// In the manage transaction page, we show "Income" to the user as "Income - Other"
// And we give the option to the user to recategorize as "Income - Paycheck"
const payIncomeString = "Income - Paycheck";
const payIncomeDisplay = "Paycheck Total";
const otherIncomeString = "Income";
const otherIncomeDisplay = "Other Income Total";

const initialState = {
  totalIncomeBudget: 0,
  payIncomeBudget: 0,
  otherIncomeBudget: 0,
};

// The reason we're using a reducer and not useState is because of the total money calculation
// that relies on the state of the paycheck and other-income in order to setState
const reducer = (state, action) => {
  let processPayload = action.payload;
  if (processPayload === "") {
    processPayload = "0";
  }
  switch (action.type) {
    case otherIncomeString:
      return {
        ...state,
        otherIncomeBudget: parseFloat(processPayload),
        totalIncomeBudget: state.payIncomeBudget + parseFloat(processPayload),
      };
    case payIncomeString:
      return {
        ...state,
        payIncomeBudget: parseFloat(processPayload),
        totalIncomeBudget: state.otherIncomeBudget + parseFloat(processPayload),
      };
    default:
      return state;
  }
};

const UnusedIncomeBudget = (props) => {
  const { getAccessTokenSilently } = useAuth0();
  const [state, dispatch] = useReducer(reducer, initialState);

  const { budgets, saveUserBudget } = props;
  const { payIncomeBudget, otherIncomeBudget } = state;

  // The onBlur isn't working right now
  //const [activePay, setActivePay] = useState(false);
  //const [activeOther, setActiveOther] = useState(false);
  //const mapSetActiveCall = {};
  //mapSetActiveCall[otherIncomeString] = setActiveOther;
  //mapSetActiveCall[payIncomeString] = setActivePay;

  const setupReducer = useCallback(
    (allBudgets) => {
      if (allBudgets) {
        if (allBudgets[otherIncomeString]) {
          dispatch({
            type: otherIncomeString,
            payload: allBudgets[otherIncomeString],
          });
        }
        if (allBudgets[payIncomeString]) {
          dispatch({
            type: payIncomeString,
            payload: allBudgets[payIncomeString],
          });
        }
      }
    },
    [dispatch]
  );

  useEffect(() => {
    setupReducer(budgets);
  }, [budgets, setupReducer]);

  // This onblur tries to reset the row value and hide the button.
  // Problem is that the button hides before the onClick fires/happens
  // And that problem happens if it is using dispatch or even just setActive(false)
  /*
  const onIncomeBlur = (event, categoryName) => {
    let dispatchValue = "";
    if (budgets && budgets[categoryName]) {
      dispatchValue = budgets[categoryName];
    }
    dispatch({
      type: categoryName,
      payload: dispatchValue,
    });
    mapSetActiveCall[categoryName](false);
  };*/

  const onIncomeSave = useCallback(
    (categoryName) => {
      const budgetData = { name: categoryName, payload: {} };
      let budget = "";
      if (categoryName === payIncomeString) {
        budget = payIncomeBudget;
      } else {
        budget = otherIncomeBudget;
      }
      const trimmedBudget = budget.trim();
      // This checks if the string in budget is a number
      const valid = trimmedBudget !== "" && !isNaN(trimmedBudget);

      if (valid) {
        budgetData.payload[categoryName] = parseFloat(trimmedBudget);
        // We only save the budget if it is a number
        // But should have UI here to tell the user something wrong happened if it isn't a number
        getAccessTokenSilently().then((accessToken) => {
          saveUserBudget(accessToken, budgetData);
        });
        // The onBlur isn't working right now
        //mapSetActiveCall[categoryName](false);
      }
    },
    [
      payIncomeBudget,
      otherIncomeBudget,
      getAccessTokenSilently,
      saveUserBudget,
      // The onBlur isn't working right now
      //mapSetActiveCall,
    ]
  );

  const onIncomeBudgetChange = (event, categoryName) => {
    let justNumber = event.target.value;
    // Note this operation shouldn't be necessary anymore
    // (at least in Chrome, can't type $ into numeric input)
    if (justNumber.charAt(0) === "$") {
      justNumber = justNumber.substring(1);
    }
    const newBudgetAmount = justNumber.trim();

    // We handle the case of an empty string in the reducer
    dispatch({ type: categoryName, payload: newBudgetAmount });
    // The onBlur isn't working right now
    //mapSetActiveCall[categoryName](true);
  };

  if (props.accountsLoading || props.transactionsLoading) {
    return <Loading />;
  }
  return (
    <>
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col">
              <h2>Income</h2>
              <Table hover>
                <thead>
                  <tr>
                    <th>Waiwai category</th>
                    <th></th>
                    <th>Income budget for {props.spendRangeDays} days</th>
                    <th>Earned last {props.spendRangeDays} days</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Income Total</td>
                    <td></td>
                    <td>{currencyFormatter.format(state.totalIncomeBudget)}</td>
                    <td>{currencyFormatter.format(props.incomeSum)}</td>
                  </tr>
                  <tr>
                    <td>{payIncomeDisplay}</td>
                    <td></td>
                    <td>{currencyFormatter.format(state.payIncomeBudget)}</td>
                    <td>{currencyFormatter.format(props.paycheckSum)}</td>
                  </tr>
                  <tr>
                    <td>{otherIncomeDisplay}</td>
                    <td></td>
                    <td>{currencyFormatter.format(state.otherIncomeBudget)}</td>
                    <td>{currencyFormatter.format(props.otherIncomeSum)}</td>
                  </tr>
                </tbody>
              </Table>
              <div className="mt-5">
                <h3>Add Income Sources</h3>
              </div>
              <div className="row">
                <div className="col">
                  {/* NOTE: CALCULATION DROPDOWNS, but Joe wants multi-source add buttons
                  <label htmlFor="pay-frequency">Paycheck Frequency</label>
                  <br />
                  <select
                    className="selectpicker form-control custom-select"
                    data-style="btn btn-default"
                    defaultValue="0"
                  >
                    <option disabled value="0">
                      {" "}
                      Choose date range
                    </option>
                    <option value="1">Weekly</option>
                    <option value="1">Bi-weekly</option>
                    <option value="1">Bi-monthly</option>
                    <option value="1">Monthly</option>
                  </select>
                  <br />
                  <label className="mt-4">Paycheck amount</label>*/}
                  <label className="mt-4">
                    Expected Paycheck Total For {props.spendRangeDays} Days
                  </label>
                  <br />
                  <input
                    value={state.payIncomeBudget}
                    onChange={(event) =>
                      onIncomeBudgetChange(event, payIncomeString)
                    }
                    type="number"
                    className="form-control"
                    // The onBlur isn't working right now
                    //onBlur={(event) => onIncomeBlur(event, payIncomeString)}
                  ></input>
                </div>
                <div className="col">
                  {/* NOTE: CALCULATION DROPDOWNS, but Joe wants multi-source add buttons
                  <label htmlFor="other-frequency">
                    Other Income Frequency
                  </label>
                  <br />
                  <select
                    className="selectpicker form-control custom-select"
                    data-style="btn btn-default"
                    defaultValue="0"
                  >
                    <option disabled value="0">
                      {" "}
                      Choose date range
                    </option>
                    <option value="1">Weekly</option>
                    <option value="1">Bi-weekly</option>
                    <option value="1">Bi-monthly</option>
                    <option value="1">Monthly</option>
                  </select>
                  <br />
                  <label className="mt-4">Other Income Amount</label>*/}
                  <label className="mt-4">
                    Expected Other Income Total For {props.spendRangeDays} Days
                  </label>
                  <br />
                  <input
                    value={state.otherIncomeBudget}
                    onChange={(event) =>
                      onIncomeBudgetChange(event, otherIncomeString)
                    }
                    type="number"
                    className="form-control"
                    // The onBlur isn't working right now
                    //onBlur={(event) => onIncomeBlur(event, otherIncomeString)}
                  ></input>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <button
                    onClick={() => onIncomeSave(payIncomeString)}
                    className="btn secondary mt-4"
                    // This is designed to work with the onBlur that isn't working right now
                    //style={{ visibility: activePay ? "visible" : "hidden" }}
                  >
                    Save
                  </button>
                </div>
                <div className="col">
                  <button
                    onClick={() => onIncomeSave(otherIncomeString)}
                    className="btn secondary mt-4"
                    // This is designed to work with the onBlur that isn't working right now
                    //style={{ visibility: activeOther ? "visible" : "hidden" }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  budgets: state.auth.budgets,
  incomeSum: state.plaid.incomeSum,
  paycheckSum: state.plaid.paycheckSum,
  otherIncomeSum: state.plaid.otherIncomeSum,
  categoriesThisSpendRange: state.plaid.categoriesThisSpendRange,
  spendRangeDays: state.auth.spendRangeDays,
  accountsLoading: state.plaid.accountsLoading,
  transactionsLoading: state.plaid.transactionsLoading,
});
const mapDispatchToProps = { saveUserBudget };

// Note that there is probably a better way to do this with React hooks now
export default connect(mapStateToProps, mapDispatchToProps)(UnusedIncomeBudget);
