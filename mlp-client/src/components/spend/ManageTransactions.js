import React from "react";
import { connect } from "react-redux";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import MUIDataTable from "mui-datatables"; // https://github.com/gregnb/mui-datatables
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../../utils/loading.js";
import ColorHeader from "../layout/ColorHeader.js";
import { currencyFormatter } from "../../utils/currencyFormatter.js";
import { defaultCategoriesThisSpendRange } from "../../utils/waiwaiCategories.js";
import { setCategory } from "../../actions/authActions.js";

const ManageTransactions = (props) => {
  const { getAccessTokenSilently } = useAuth0();

  if (props.accountsLoading || props.transactionsLoading) {
    return <Loading />;
  }
  const onCategorySelect = (eventkey, event, update_id) => {
    const transactionPayload = {
      transactionID: update_id,
      newMainCategory: eventkey,
    };
    getAccessTokenSilently().then((accessToken) => {
      props.setCategory(accessToken, transactionPayload);
    });
  };
  // Setting up mui table
  const transactionMUIColumns = [
    { label: "Date", name: "date" },
    { label: "Account", name: "account" },
    { label: "Name", name: "name" },
    { label: "Amount", name: "amount" },
    { label: "Category", name: "category" },
    {
      label: "Update",
      name: "update_id",
      options: {
        filter: false,
        customBodyRender: (dataValue) => {
          return (
            <DropdownButton
              onSelect={(eventkey, event) =>
                onCategorySelect(eventkey, event, dataValue)
              }
              id="category-dropdown"
              title="Change Category"
            >
              {defaultCategoriesThisSpendRange.map((category) => {
                return (
                  <Dropdown.Item key={category.name} eventKey={category.name}>
                    {category.name === "Income"
                      ? "Income - Other"
                      : category.name}
                  </Dropdown.Item>
                );
              })}
              <Dropdown.Item href="#">Income - Paycheck</Dropdown.Item>
            </DropdownButton>
          );
          //return <button className="btn secondary">Change Category</button>;
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
        const pushTransaction = {
          update_id: transaction.transaction_id,
          account: account.accountName,
          date: transaction.date,
          category: transaction.category[0],
          name: transaction.name,
          amount: currencyFormatter.format(transaction.amount * -1),
        };
        transactionsData.push(pushTransaction);
      });
    });
  }

  return (
    <>
      <ColorHeader
        mainHeaderText="Transaction"
        subHeaderText="History"
        colorClassName="section-header-green"
      />
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
const mapDispatchToProps = { setCategory };

// Note that there is probably a better way to do this with React hooks now
export default connect(mapStateToProps, mapDispatchToProps)(ManageTransactions);
