import React from "react";
import { connect } from "react-redux";

const ManageTransactionsRow = (props) => {
  return (
    <tr key={props.transaction.transaction_id}>
      <td>{props.transaction.date}</td>
      <td>{props.bankName}</td>
      <td>{props.transaction.name}</td>
      <td>{props.transaction.amount}</td>
      <td>{props.transaction.category[0]}</td>
      <td>
        <button>Change Category</button>
      </td>
      <td>
        <button>Mark Reviewed</button>
      </td>
    </tr>
  );
};

const mapStateToProps = (state) => ({
  categoryMap: state.auth.categoryMap,
});

// Note that there is probably a better way to do this with React hooks now
export default connect(mapStateToProps, {})(ManageTransactionsRow);
