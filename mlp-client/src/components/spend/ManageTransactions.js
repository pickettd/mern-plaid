import React from "react";
import Table from "react-bootstrap/Table";
import { connect } from "react-redux";
import ManageTransactionRow from "./ManageTransactionRow";
import SpendRangeHeader from "../layout/SpendRangeHeader";

const ManageTransactions = (props) => {
  return (
    <>
      <SpendRangeHeader mainHeaderText="Transaction" subHeaderText="History" />
      {/* Commenting this out because in this version we won't have need/want/save */}
      {/*<div className="section section-donuts">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-3 col-6">Donut Graph</div>
            <div className="col-lg-3 col-6">
              <h2 className="">70%</h2>
            </div>
            <div className="col-lg-3 col-6">Graph</div>
            <div className="col-lg-3 col-6">Graph</div>
          </div>
        </div>
      </div>*/}
      <div className="section table-section">
        <div className="container">
          <Table striped hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Account</th>
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
