import React from "react";
import { connect } from "react-redux";
import { PlaidButton, DeleteAccountButton } from "../../utils/plaidButton.js";
import ColorHeader from "../layout/ColorHeader";

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
          buttonText="Connect a new bank account"
          existingAccount={null}
        />
      </div>
    </div>
  );

  return (
    <>
      <ColorHeader
        mainHeaderText="Bank Accounts"
        subHeaderText=""
        colorClassName="section-header-blue"
      />
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col"></div>
          </div>
          {props.accountsLoading ? <></> : listAccounts}
          {addButton}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  accounts: state.plaid.accounts,
  accountsLoading: state.plaid.accountsLoading,
});
const mapDispatchToProps = {};

// Note that there is probably a better way to do this with React hooks now
export default connect(mapStateToProps, mapDispatchToProps)(BankAccountsPage);
