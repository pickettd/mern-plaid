import React, { useCallback } from "react";
import { usePlaidLink } from "react-plaid-link";
// Can use the following to test component version of Plaid Link
//import { PlaidLink } from "react-plaid-link";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { addAccount, refreshAccount } from "../actions/accountActions";
import { useAuth0 } from "@auth0/auth0-react";

export const DeleteAccountButton = (props) => {
  return <Button>Delete</Button>;
};

const PlaidToExport = (props) => {
  const { refreshAccount, addAccount } = props;
  const { getAccessTokenSilently } = useAuth0();

  // In theory you can tell the Plaid Link to get an Auth0 token when it opens
  /*const onOpen = useCallback((eventName, metadata)) => {
      if (eventName === "OPEN") { .... }
  },[getAccessTokenSilently]);*/

  const newAccountOnSuccess = useCallback(
    (token, metadata) => {
      // send token to server
      const plaidData = {
        public_token: token,
        metadata: metadata,
      };
      getAccessTokenSilently().then((accessToken) => {
        addAccount(accessToken, plaidData);
      });
    },
    [addAccount, getAccessTokenSilently]
  );
  const refreshAccountOnSuccess = useCallback(
    (token, metadata) => {
      // send token to server
      const plaidData = {
        public_token: token,
        metadata: metadata,
      };

      getAccessTokenSilently().then((token) => {
        refreshAccount({ token: token, plaidData: plaidData });
      });
    },
    [getAccessTokenSilently, refreshAccount]
  );

  const config = {
    //token: "",
    clientName: process.env.REACT_APP_NAME,
    publicKey: process.env.REACT_APP_PLAID_PUBLIC_KEY,
    env: process.env.REACT_APP_PLAID_ENV_STRING,
    product: ["transactions"],
    onSuccess: newAccountOnSuccess,
    // ...
  };

  if (props.existingAccount && props.existingAccount.toRefresh) {
    config.token = props.existingAccount.publicToken;
    config.onSuccess = refreshAccountOnSuccess;
  }

  const { open, ready /*, error*/ } = usePlaidLink(config);

  return (
    <>
      {/* Note this button is used to refresh accounts and also add new accounts
      depending on what props are supplied*/}
      <Button
        onClick={() => open()}
        disabled={
          !ready || (props.existingAccount && !props.existingAccount.toRefresh)
        }
      >
        {props.buttonText}
      </Button>
      {/* Can use the following to test component version of Plaid Link*/}
      {/*<PlaidLink {...config}>Connect a bank account</PlaidLink>*/}
    </>
  );
};

PlaidToExport.displayName = "Plaid";

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {
  addAccount,
  refreshAccount,
};

// Note that there is probably a better way to do this with React hooks now
export const PlaidButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaidToExport);
