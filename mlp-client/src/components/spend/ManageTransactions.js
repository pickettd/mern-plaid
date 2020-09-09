import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import MUIDataTable from "mui-datatables"; // https://github.com/gregnb/mui-datatables
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from "react-router-dom";
import Loading from "../../utils/loading.js";
import ColorHeader from "../layout/ColorHeader.js";
import { currencyFormatter } from "../../utils/currencyFormatter.js";
import { defaultCategoriesThisSpendRange } from "../../utils/waiwaiCategories.js";
import { setTransactionSettings } from "../../actions/authActions.js";

const createTableTransactions = (inputTransactions) => {
  let transactionsData = [];
  inputTransactions.forEach(function (account) {
    account.transactions.forEach(function (transaction) {
      const pushTransaction = {
        update_obj: {
          id: transaction.transaction_id,
          name: transaction.category[0],
        },
        review_obj: {
          id: transaction.transaction_id,
          isReviewed: transaction.isReviewed,
        },
        duplicate_obj: {
          id: transaction.transaction_id,
          isDuplicate: transaction.isDuplicate,
        },
        account: account.accountName,
        date: transaction.date,
        category: transaction.category[0],
        name: transaction.name,
        amount: currencyFormatter.format(transaction.amount * -1),
      };
      transactionsData.push(pushTransaction);
    });
  });
  return transactionsData;
};

class RenderTable extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      tableTransactions: [],
      updatedOnce: false,
    };
  }

  onCategorySelect = (eventkey, event, update_id, updateValue) => {
    const transactionPayload = {
      transactionID: update_id,
      newMainCategory: eventkey,
    };
    this.props.getAccessTokenSilently().then((accessToken) => {
      this.props.setTransactionSettings(accessToken, transactionPayload);
    });
    updateValue({ id: update_id, name: eventkey });
  };
  onReviewClick = (review_obj, updateValue) => {
    const transactionPayload = {
      transactionID: review_obj.id,
      newReviewedState: !review_obj.isReviewed,
    };
    this.props.getAccessTokenSilently().then((accessToken) => {
      this.props.setTransactionSettings(accessToken, transactionPayload);
    });
    updateValue({ id: review_obj.id, isReviewed: !review_obj.isReviewed });
  };
  onDuplicateClick = (duplicate_obj, updateValue) => {
    const transactionPayload = {
      transactionID: duplicate_obj.id,
      newDuplicateState: !duplicate_obj.isDuplicate,
    };
    this.props.getAccessTokenSilently().then((accessToken) => {
      this.props.setTransactionSettings(accessToken, transactionPayload);
    });
    updateValue({
      id: duplicate_obj.id,
      isDuplicate: !duplicate_obj.isDuplicate,
    });
  };
  // Setting up mui table
  transactionMUIColumns = [
    { label: "Date", name: "date" },
    { label: "Account", name: "account" },
    { label: "Name", name: "name" },
    { label: "Amount", name: "amount" },
    {
      label: "Category",
      name: "update_obj",
      options: {
        filter: false,
        customBodyRender: (dataValue, tableMeta, updateValue) => {
          return (
            <DropdownButton
              disabled={
                tableMeta.rowData[6] && tableMeta.rowData[6].isDuplicate
                  ? true
                  : false
              }
              onSelect={(eventkey, event) =>
                this.onCategorySelect(
                  eventkey,
                  event,
                  dataValue.id,
                  updateValue
                )
              }
              id="category-dropdown"
              title={dataValue.name}
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
              <Dropdown.Item eventKey={"Income - Paycheck"}>
                Income - Paycheck
              </Dropdown.Item>
            </DropdownButton>
          );
        },
      },
    },
    {
      label: "Reviewed?",
      name: "review_obj",
      options: {
        filter: false,
        customBodyRender: (dataValue, tableMeta, updateValue) => {
          if (dataValue.isReviewed || tableMeta.rowData[6].isDuplicate) {
            return <>&#x2713;</>;
          }
          return (
            <button
              onClick={() => this.onReviewClick(dataValue, updateValue)}
              className="btn secondary"
            >
              &#x2713;
            </button>
          );
        },
      },
    },
    {
      label: "Duplicate?",
      name: "duplicate_obj",
      options: {
        filter: false,
        customBodyRender: (dataValue, tableMeta, updateValue) => {
          return (
            <button
              name={dataValue.isDuplicate ? "Dupe" : "None"}
              onClick={() => this.onDuplicateClick(dataValue, updateValue)}
              className="btn secondary"
            >
              {dataValue.isDuplicate ? <>Undo</> : <>Ignore</>}
            </button>
          );
        },
      },
    },
  ];

  shouldComponentUpdate(nextProps, nextState) {
    // We want to keep updating until we have transactions
    if (this.state.tableTransactions.length === 0) {
      return true;
    }

    // Once we have transactions, stop updating
    return !this.state.updatedOnce;
  }
  componentDidUpdate() {
    // This will set the set of new transactions from props
    // And we only want to set state once
    // Note that when we are navigating from another page the html will create a fresh component
    if (
      this.props.tableTransactions.length &&
      this.state.tableTransactions.length === 0
    ) {
      this.setState({
        tableTransactions: this.props.tableTransactions,
        updatedOnce: true,
      });
    }
  }

  render() {
    if (this.state.tableTransactions.length === 0) {
      return <Loading />;
    }
    return (
      <MUIDataTable
        title={"Manage Transactions"}
        data={this.state.tableTransactions}
        columns={this.transactionMUIColumns}
        options={{
          filterType: "checkbox",
          selectableRows: "none",
          sortOrder: { name: "date", direction: "desc" },
          setRowProps: (row) => {
            if (row[6].props.name === "Dupe") {
              return {
                style: { textDecoration: "line-through" },
              };
            }
            return {};
          },
        }}
      />
    );
  }
}

const ManageTransactions = (props) => {
  const { getAccessTokenSilently } = useAuth0();
  const [tableTransactions, setTransactions] = useState([]);
  const { transactions, userFirstVisit } = props;

  useEffect(() => {
    if (transactions && transactions.length) {
      const transactionsData = createTableTransactions(transactions);
      setTransactions([...transactionsData]);
    }
  }, [transactions, setTransactions]);

  if (userFirstVisit && !tableTransactions.length) {
    return (
      <div>
        <Redirect to="/bank-accounts" />
      </div>
    );
  }

  return (
    <>
      <ColorHeader
        mainHeaderText="Transaction History"
        subHeaderText="Categorize all your transactions"
        colorClassName="section-header-blue"
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
          <RenderTable
            tableTransactions={createTableTransactions(transactions)}
            getAccessTokenSilently={getAccessTokenSilently}
            setTransactionSettings={props.setTransactionSettings}
          />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  transactions: state.plaid.transactions,
  accountsLoading: state.plaid.accountsLoading,
  transactionsLoading: state.plaid.transactionsLoading,
  userFirstVisit: state.plaid.userFirstVisit,
});
const mapDispatchToProps = { setTransactionSettings };

// Note that there is probably a better way to do this with React hooks now
export default connect(mapStateToProps, mapDispatchToProps)(ManageTransactions);
