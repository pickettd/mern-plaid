import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { useAuth0 } from "@auth0/auth0-react";
import Auth0ProviderWithHistory from "./utils/auth0-provider-with-history.js";
import PrivateRoute from "./utils/privateRoute.js";
import Loading from "./utils/loading.js";
import "./App.scss";
import Header from "./components/layout/Header.js";
import Footer from "./components/layout/Footer.js";
import HomePage from "./components/layout/HomePage.js";
import SpendStory from "./components/spend/SpendStory.js";
import SpendPlan from "./components/spend/SpendPlan.js";
import ManageTransactions from "./components/spend/ManageTransactions.js";
import BankAccountsPage from "./components/profile/BankAccountsPage.js";
import UserProfilePage from "./components/profile/UserProfilePage.js";
import rootReducer from "./reducers";
import AccountBootstrap from "./components/layout/TransactionBootstrap.js";
import Orientation from "./components/profile/Orientation.js";

const store = configureStore({
  reducer: rootReducer,
});

const Routing = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  const isLiveData = process.env.REACT_APP_LIVEDATA === "true";
  const accessCheck = process.env.REACT_APP_ACCESSCHECK
    ? process.env.REACT_APP_ACCESSCHECK
    : "";

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {isAuthenticated ? <Header /> : <></>}
      {isAuthenticated && isLiveData ? <AccountBootstrap /> : <></>}
      <Switch>
        <Route exact path={process.env.PUBLIC_URL + "/"}>
          {isAuthenticated ? (
            <Redirect to="/spend-story" />
          ) : (
            <HomePage accessCheck={accessCheck} />
          )}
        </Route>
        <PrivateRoute path="/spend-story" component={SpendStory} />
        <PrivateRoute path="/spend-plan" component={SpendPlan} />
        <PrivateRoute
          path="/manage-transactions"
          component={ManageTransactions}
        />
        <PrivateRoute path="/user-profile" component={UserProfilePage} />
        <PrivateRoute path="/bank-accounts" component={BankAccountsPage} />
        <PrivateRoute path="/orientation" component={Orientation} />
      </Switch>
      {isAuthenticated ? <Footer /> : <></>}
    </>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Auth0ProviderWithHistory>
          <Routing />
        </Auth0ProviderWithHistory>
      </Router>
    </Provider>
  );
}

export default App;
