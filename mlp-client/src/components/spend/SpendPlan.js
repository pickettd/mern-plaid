import React from "react";
import Table from "react-bootstrap/Table";
import { connect } from "react-redux";
import SpendPlanRow from "./SpendPlanRow";

const SpendPlan = (props) => {
  return (
    <>
      <div>This is the Spend Plan</div>
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
            return <SpendPlanRow key={i} category={category}></SpendPlanRow>;
          })}
        </tbody>
      </Table>
    </>
  );
};

const mapStateToProps = (state) => ({
  categoriesThisMonth: state.plaid.categoriesThisMonth,
});

// Note that there is probably a better way to do this with React hooks now
export default connect(mapStateToProps, {})(SpendPlan);
