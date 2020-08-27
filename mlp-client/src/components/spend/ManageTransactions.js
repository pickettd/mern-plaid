import React from "react";
import { connect } from "react-redux";
import MUIDataTable from "mui-datatables"; // https://github.com/gregnb/mui-datatables
import Loading from "../../utils/loading.js";
import GreenHeader from "../layout/GreenHeader.js";
import { currencyFormatter } from "../../utils/currencyFormatter";

const ManageTransactions = (props) => {
  if (props.accountsLoading || props.transactionsLoading) {
    return <Loading />;
  }
  // Setting up mui table
  const transactionMUIColumns = [
    { label: "Date", name: "date" },
    { label: "Account", name: "account" },
    { label: "Name", name: "name" },
    { label: "Amount", name: "amount" },
    { label: "Category", name: "category" },
    {
      label: "Update",
      name: "update",
      options: {
        filter: false,
        customBodyRenderLite: (dataIndex) => {
          return <button className="btn secondary">Change Category</button>;
        },
      },
    },
    {
      label: "Reviewed?",
      name: "reviewed",
      options: {
        filter: false,
        customBodyRenderLite: (dataIndex) => {
          return <button className="btn secondary">&#x2713;</button>;
        },
      },
    },
  ];
  const optionsMUI = {
    filterType: "checkbox",
    selectableRows: "none",
    sortOrder: { name: "date", direction: "desc" },
  };

  let transactionsData = [];
  if (props.transactions) {
    props.transactions.forEach(function (account) {
      account.transactions.forEach(function (transaction) {
        transactionsData.push({
          account: account.accountName,
          date: transaction.date,
          category: transaction.category[0],
          name: transaction.name,
          amount: currencyFormatter.format(transaction.amount),
        });
      });
    });
  }
  return (
    <>
      <GreenHeader mainHeaderText="Transaction" subHeaderText="History" />
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
          <MUIDataTable
            title={"Manage Transactions"}
            data={transactionsData}
            columns={transactionMUIColumns}
            options={optionsMUI}
          />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  transactions: state.plaid.transactions,
  accounts: state.plaid.accounts,
  accountsLoading: state.plaid.accountsLoading,
  transactionsLoading: state.plaid.transactionsLoading,
});
const mapDispatchToProps = {};

// Note that there is probably a better way to do this with React hooks now
export default connect(mapStateToProps, mapDispatchToProps)(ManageTransactions);
