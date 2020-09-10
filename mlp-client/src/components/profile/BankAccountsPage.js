import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../../utils/loading.js";
import { PlaidButton, DeleteAccountButton } from "../../utils/plaidButton.js";
import ColorHeader from "../layout/ColorHeader";
import Orientation from "./Orientation.js";

const BankAccountsPage = (props) => {
  const listAccounts = props.accounts.map((account, i) => {
    return (
      <div className="row mb-4" key={account._id}>
        <div className="col">
          <h2>{account.institutionName}</h2>
          <PlaidButton
            className="Secondary"
            buttonText="Refresh"
            existingAccount={account}
          />{" "}
          <span className="notButton">
            <DeleteAccountButton account={account} />
          </span>
        </div>
      </div>
    );
  });

  const addButton = (
    <div className="row">
      <div className="col">
        <PlaidButton
          buttonText={
            props.userFirstVisit
              ? "Connect your bank account"
              : "Connect another bank account"
          }
          existingAccount={null}
        />
      </div>
    </div>
  );

  return (
    <>
      <ColorHeader
        mainHeaderText={
          props.userFirstVisit ? "First Time Here?" : "Bank Accounts"
        }
        subHeaderText=""
        colorClassName="section-header-green"
      />
      <div className="section">
        <div className="container">
          {props.userFirstVisit ? <Orientation /> : <></>}
          {props.accountsLoading ? <></> : listAccounts}
          {addButton}
          <br />
          <div className="row">
            <div className="col">
              {!props.userFirstVisit && props.transactionsLoading ? (
                <Loading />
              ) : (
                <></>
              )}
              {!props.userFirstVisit && !props.transactionsLoading ? (
                <>
                  <Link to="manage-transactions">Review Transactions</Link>
                  <br />
                  <Link to="spend-plan">Manage My Plan</Link>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  accounts: state.plaid.accounts,
  accountsLoading: state.plaid.accountsLoading,
  transactionsLoading: state.plaid.transactionsLoading,
  userFirstVisit: state.plaid.userFirstVisit,
});
const mapDispatchToProps = {};

// Note that there is probably a better way to do this with React hooks now
export default connect(mapStateToProps, mapDispatchToProps)(BankAccountsPage);
