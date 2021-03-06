import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import {
  setCurrentUser,
  logoutUser,
  setCurrentBudgets,
  setCurrentCategoryMap,
  getUserInfo } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";

import "./App.scss";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  if (decoded && decoded.id) {
    if (localStorage.allBudgets) {
      const allBudgets = JSON.parse(localStorage.allBudgets);
      if (allBudgets && allBudgets[decoded.id]) {
        decoded.budgets = allBudgets[decoded.id];
        store.dispatch(setCurrentBudgets(allBudgets[decoded.id]));
      }
    }
    if (localStorage.allCatMaps) {
      const allCatMaps = JSON.parse(localStorage.allCatMaps);
      if (allCatMaps && allCatMaps[decoded.id]) {
        decoded.categoryMap = allCatMaps[decoded.id];
        store.dispatch(setCurrentCategoryMap(allCatMaps[decoded.id]));
      }
    }
  }
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
  else {
    // Check server for updated user-info (budgets and categories) beyond what is cached
    store.dispatch(getUserInfo());
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
