import React from "react";
import Table from "react-bootstrap/Table";
import { connect } from "react-redux";
import ManageTransactionRow from "./ManageTransactionRow";

const ManageTransactions = (props) => {
  return (
    <>
      <div>This is the Manage Transactions Page</div>
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
