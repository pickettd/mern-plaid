import React from "react";
import Table from "react-bootstrap/Table";
import { connect } from "react-redux";
import SpendPlanRow from "./SpendPlanRow";
import SpendRangeHeader from "../layout/SpendRangeHeader";

const SpendPlan = (props) => {
  return (
    <>
      <SpendRangeHeader mainHeaderText="Spend" subHeaderText="Plan" />
      <div className="section section-header-generic">
        <div className="container">
          <div className="row">
            <div className="col">
              <h2>Income</h2>
              <label for="pay-frequency">Pay Frequency</label>
              <select className="selectpicker" data-style="btn btn-default">
                <option disabled selected>
                  {" "}
                  Choose date range
                </option>
                <option value="1">Weekly</option>
                <option value="1">Bi-weekly</option>
                <option value="1">Bi-monthly</option>
                <option value="1">Monthly</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="section table-section">
        <div className="container">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Bank category name</th>
                <th>My category name</th>
                <th>Budget for 30 days</th>
                <th>Spent last 30 days</th>
              </tr>
            </thead>
            <tbody>
              {props.categoriesThisMonth.map((category, i) => {
                return (
                  <SpendPlanRow key={i} category={category}></SpendPlanRow>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  categoriesThisMonth: state.plaid.categoriesThisMonth,
});

// Note that there is probably a better way to do this with React hooks now
export default connect(mapStateToProps, {})(SpendPlan);
