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
                    Transaction
                    <br />
                    <span className="small bottom">History</span>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section section-header-generic">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-3 col-6">Donut Graph</div>
            <div className="col-lg-3 col-6">
              <h2 classNameName="">70%</h2>
            </div>
            <div className="col-lg-3 col-6">Graph</div>
            <div className="col-lg-3 col-6">Graph</div>
          </div>
        </div>
      </div>
      <div className="section table-section">
        <div className="container">
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
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  transactions: state.plaid.transactions,
});

// Note that there is probably a better way to do this with React hooks now
export default connect(mapStateToProps, {})(ManageTransactions);
