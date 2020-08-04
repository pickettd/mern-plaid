import React from "react";
import Table from "react-bootstrap/Table";
import { connect } from "react-redux";
import ManageTransactionRow from "./ManageTransactionRow";

const ManageTransactions = (props) => {
  return (
    <>
      <div className="section-space"></div>
      <div className="section section-header-generic">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="container">
                <div className="row">
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <select
                        className="selectpicker"
                        data-style="btn btn-default"
                      >
                        <option disabled selected>
                          {" "}
                          Choose date range
                        </option>
                        <option value="1">1 week </option>
                        <option value="1">30 days</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <h1>
                    Spend
                    <br />
                    <span className="small bottom">Plan</span>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Bank Account</th>
            <th>Transaction</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Update</th>
            <th>Reviewed?</th>
          </tr>
        </thead>
        <tbody>
          {props.transactions.map((bank, i) => {
            return bank.transactions.map((transaction, j) => {
              return (
                <ManageTransactionRow
                  key={j}
                  bankName={bank.accountName}
                  transaction={transaction}
                ></ManageTransactionRow>
              );
            });
          })}
        </tbody>
      </Table>
    </>
  );
};

const mapStateToProps = (state) => ({
  transactions: state.plaid.transactions,
});

// Note that there is probably a better way to do this with React hooks now
export default connect(mapStateToProps, {})(ManageTransactions);
