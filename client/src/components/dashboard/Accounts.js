import React, { Component } from "react";
import PropTypes from "prop-types";
import PlaidLinkButton from "react-plaid-link-button";
import { connect } from "react-redux";
import {
  getTransactions,
  addAccount,
  deleteAccount
} from "../../actions/accountActions";
import { logoutUser } from "../../actions/authActions";
//import MaterialTable from "material-table"; // https://mbrn.github.io/material-table/#/
import MUIDataTable from "mui-datatables"; // https://github.com/gregnb/mui-datatables
import {
  VictoryBar,
  VictoryPie,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLegend,
  VictoryArea
} from "victory"; // https://formidable.com/open-source/victory/docs/
import moment from "moment";

class Accounts extends Component {
  componentDidMount() {
    const { accounts } = this.props;
    this.props.getTransactions(accounts);
  }

  // Add account
  handleOnSuccess = (token, metadata) => {
    const { accounts } = this.props;
    const plaidData = {
      public_token: token,
      metadata: metadata,
      accounts: accounts
    };

    this.props.addAccount(plaidData);
  };

  // Delete account
  onDeleteClick = id => {
    const { accounts } = this.props;
    const accountData = {
      id: id,
      accounts: accounts
    };
    this.props.deleteAccount(accountData);
  };

  // Logout
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user, accounts } = this.props;
    const { transactions, transactionsLoading } = this.props.plaid;

    let accountItems = accounts.map(account => (
      <li key={account._id} style={{ marginTop: "1rem" }}>
        <button
          style={{ marginRight: "1rem" }}
          onClick={this.onDeleteClick.bind(this, account._id)}
          className="btn btn-flat btn-floating waves-effect waves-light blue lighten-2 hoverable"
        >
          <i className="material-icons">delete</i>
        </button>
        <b>{account.institutionName}</b>
      </li>
    ));

    // Setting up data table
    /*const transactionsColumns = [
      { title: "Account", field: "account" },
      { title: "Date", field: "date", type: "date", defaultSort: "desc" },
      { title: "Name", field: "name" },
      { title: "Amount", field: "amount", type: "numeric" },
      { title: "Category", field: "category" }
    ];*/
    // Setting up mui table
    const transactionMUIColumns = [
      { label: "Date", name: "date", options: { sortDirection: "desc" } },
      { label: "Account", name: "account" },
      { label: "Name", name: "name" },
      { label: "Amount", name: "amount" },
      { label: "Category", name: "category" }
    ];
    const optionsMUI = {
      filterType: "checkbox",
      selectableRows: "none"
    };
    const currencyFormatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2
    });

    let profit = 0;
    let income = 0;
    let spending = 0;
    const spendingByCategory = {};
    const categoriesThisMonth = [];
    let categoryCount = 1;
    const spendingByDate = {};
    const datesLastThirty = [];
    const dateNow = new Date();
    const pieChartColorScale = [
      "#e3f2fd",
      "#90caf9",
      "#42a5f5",
      "#1e88e5",
      "#1565c0",
      "#0d47a1",
      "#448aff",
      "#2962ff"
    ];

    let transactionsData = [];
    transactions.forEach(function(account) {
      account.transactions.forEach(function(transaction) {
        // By default, the plaid transactions are positive for spent money and negative for earned money - so we reverse that
        transaction.amount *= -1;

        profit += transaction.amount;
        if (transaction.amount < 0) {
          spending += -1 * transaction.amount;

          // This if/else sets up the spending category object with category as key and amount total as value
          if (spendingByCategory[transaction.category[0]]) {
            spendingByCategory[transaction.category[0]] +=
              -1 * transaction.amount;
          } else {
            // This is the case that the category hasn't been seen before
            categoriesThisMonth.push({
              x: categoryCount,
              label: transaction.category[0],
              name: transaction.category[0]
            });
            categoryCount++;
            spendingByCategory[transaction.category[0]] =
              -1 * transaction.amount;
          }

          // This if/else sets up the spending date object with date as key and amount total as value
          if (spendingByDate[transaction.date]) {
            spendingByDate[transaction.date] += -1 * transaction.amount;
          } else {
            // This is the case that the date hasn't been seen before
            spendingByDate[transaction.date] = -1 * transaction.amount;
          }
        } else {
          income += transaction.amount;
        }

        transactionsData.push({
          account: account.accountName,
          date: transaction.date,
          category: transaction.category[0],
          name: transaction.name,
          amount: currencyFormatter.format(transaction.amount)
        });
      });
    });

    for (let a = 30; a > 0; a--) {
      let insertDate = new Date(Number(dateNow));
      insertDate.setDate(insertDate.getDate() - a);
      let momentDate = moment(insertDate);
      let setDateSpend = 0;
      if (spendingByDate[momentDate.format("YYYY-MM-DD")]) {
        setDateSpend = spendingByDate[momentDate.format("YYYY-MM-DD")];
      }
      datesLastThirty.push({
        x: momentDate.format("MM-DD"),
        y: setDateSpend
      });
    }

    return (
      <div>
        <div className="container header-elements">
          <h4 className="greeting">
            <b>Aloha {user.name.split(" ")[0]}</b>
          </h4>
          <button
            onClick={this.onLogoutClick}
            className="btn-flat blue lighten-2 waves-effect logout"
          >
            Sign Out
          </button>
        </div>
        <div className="row">
          <h2>
            <b>Transactions</b>
          </h2>
          <div className="col s7">
            {/*<h5 className="numbers">$1,800</h5>*/}
            <h5 className="numbers">{currencyFormatter.format(profit)}</h5>
            <p className="grey-text text-darken-1 helper">Profit this month</p>
            <div className="row">
              <div className="col s6 income">
                {/*<h5 className="numbers">$2,350</h5>*/}
                <h5 className="numbers">{currencyFormatter.format(income)}</h5>
                <p className="grey-text text-darken-1 helper">Income</p>
              </div>
              <div className="col s6 spending">
                {/*<h5 className="numbers">$550</h5>*/}
                <h5 className="numbers">
                  {currencyFormatter.format(spending)}
                </h5>
                <p className="grey-text text-darken-1 helper">Spending</p>
              </div>
            </div>
          </div>

          <div className="col s5">
            <h5 className="small">
              <b>Linked Accounts</b>
            </h5>
            <p className="grey-text text-darken-1 helper">
              Add or remove your bank accounts below
            </p>
            <div className="row">
              <div className="col s6 bank-accounts">
                <ul>{accountItems}</ul>
                <PlaidLinkButton
                  buttonProps={{
                    className:
                      "btn-flat waves-effect waves-light hoverable add-account main-btn"
                  }}
                  plaidLinkProps={{
                    clientName: process.env.REACT_APP_NAME,
                    key: process.env.REACT_APP_PLAID_PUBLIC_KEY,
                    env: process.env.REACT_APP_PLAID_ENV_STRING,
                    product: ["transactions"],
                    onSuccess: this.handleOnSuccess
                  }}
                  onScriptLoad={() => this.setState({ loaded: true })}
                >
                  + Add Account
                </PlaidLinkButton>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {transactionsLoading ? (
            <p className="grey-text text-darken-1">Fetching transactions...</p>
          ) : (
            <>
              <div className="col s6">
                <h5 className="small">
                  <b>Category</b>
                </h5>

                <VictoryPie
                  theme={VictoryTheme.material}
                  labelRadius={({ radius }) => radius + 15}
                  colorScale={pieChartColorScale}
                  style={{ labels: { fontSize: 8 } }}
                  data={categoriesThisMonth}
                  y={d => spendingByCategory[d.label]}
                />
                <VictoryLegend
                  theme={VictoryTheme.material}
                  colorScale={pieChartColorScale}
                  orientation="horizontal"
                  itemsPerRow={4}
                  gutter={20}
                  style={{
                    border: { stroke: "black" },
                    title: { fontSize: 20 }
                  }}
                  data={categoriesThisMonth}
                />
              </div>
              <div className="col s6">
                <h5 className="small">
                  <b>Day</b>
                </h5>
                <VictoryChart
                  domainPadding={20}
                  theme={VictoryTheme.material}
                  padding={{ left: 50, top: 50, right: 10, bottom: 50 }}
                >
                  {/*<VictoryBar
                  data={datesLastThirty}
                  horizontal={true}
                />*/}
                  <VictoryAxis
                    style={{ tickLabels: { angle: -60 } }}
                    fixLabelOverlap={true}
                  />
                  <VictoryAxis
                    dependentAxis
                    tickFormat={tick => `$${Math.round(tick)}`}
                  />
                  <VictoryArea
                    style={{ data: { fill: "#2962ff" } }}
                    data={datesLastThirty}
                  />
                </VictoryChart>
              </div>
            </>
          )}
        </div>
        <div className="row">
          <div className="col s12">
            {transactionsLoading ? (
              <p className="grey-text text-darken-1"></p>
            ) : (
              <>
                <p className="grey-text text-darken-1 helper">
                  You have <b>{transactionsData.length}</b> transactions from
                  your
                  <b> {accounts.length}</b> linked
                  {accounts.length > 1 ? (
                    <span> accounts </span>
                  ) : (
                    <span> account </span>
                  )}
                  from the past 30 days
                </p>
                <MUIDataTable
                  title={"Search Transactions"}
                  data={transactionsData}
                  columns={transactionMUIColumns}
                  options={optionsMUI}
                />
                {/*<MaterialTable
                  columns={transactionsColumns}
                  data={transactionsData}
                  title="Search Transactions"
                />*/}
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

Accounts.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  getTransactions: PropTypes.func.isRequired,
  addAccount: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  accounts: PropTypes.array.isRequired,
  plaid: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  plaid: state.plaid
});

export default connect(
  mapStateToProps,
  { logoutUser, getTransactions, addAccount, deleteAccount }
)(Accounts);
