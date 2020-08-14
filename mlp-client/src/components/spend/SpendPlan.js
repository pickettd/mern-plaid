import React from "react";
import Table from "react-bootstrap/Table";
import { connect } from "react-redux";
import SpendPlanRow from "./SpendPlanRow";
import SpendRangeHeader from "../layout/SpendRangeHeader";
import { currencyFormatter } from "../../utils/currencyFormatter";

const SpendPlan = (props) => {
  return (
    <>
      <SpendRangeHeader mainHeaderText="Spend" subHeaderText="Plan" />
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col">
              <h2>Income</h2>
              <Table hover>
                <thead>
                  <tr>
                    <th>Bank category name</th>
                    <th>My category name</th>
                    <th>Budget for {props.spendRangeDaysSelected} days</th>
                    <th>Earned last {props.spendRangeDaysSelected} days</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Income Total</td>
                    <td></td>
                    <td></td>
                    <td>{currencyFormatter.format(props.incomeSum)}</td>
                  </tr>
                  <tr>
                    <td>Paycheck Total</td>
                    <td></td>
                    <td></td>
                    <td>{currencyFormatter.format(props.paycheckSum)}</td>
                  </tr>
                  <tr>
                    <td>Other Income Total</td>
                    <td></td>
                    <td></td>
                    <td>{currencyFormatter.format(props.otherIncomeSum)}</td>
                  </tr>
                </tbody>
              </Table>
              <div>Add Income Sources:</div>
              <div>
                <label htmlFor="pay-frequency">Paycheck Frequency</label>
                <br />
                <select
                  className="selectpicker"
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
                <label>Paycheck amount</label>
                <br />
                <input></input>
              </div>
              <div>
                <label htmlFor="other-frequency">Other Income Frequency</label>
                <br />
                <select
                  className="selectpicker"
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
                <label>Other Income Amount</label>
                <br />
                <input></input>
              </div>
              <button className="btn secondary">Save</button>
            </div>
          </div>
        </div>
      </div>
      <div className="section table-section">
        <div className="container">
          <div className="row">
            <div className="col">
              <h2>Expenses</h2>
              <Table hover>
                <thead>
                  <tr>
                    <th>Bank category name</th>
                    <th>My category name</th>
                    <th>Budget for {props.spendRangeDaysSelected} days</th>
                    <th>Spent last {props.spendRangeDaysSelected} days</th>
                  </tr>
                </thead>
                <tbody>
                  {props.categoriesThisSpendRange.map((category, i) => {
                    return (
                      <SpendPlanRow key={i} category={category}></SpendPlanRow>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  incomeSum: state.plaid.incomeSum,
  paycheckSum: state.plaid.paycheckSum,
  otherIncomeSum: state.plaid.otherIncomeSum,
  categoriesThisSpendRange: state.plaid.categoriesThisSpendRange,
  spendRangeDaysSelected: state.plaid.spendRangeDaysSelected,
});

// Note that there is probably a better way to do this with React hooks now
export default connect(mapStateToProps, {})(SpendPlan);
