import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import "./App.scss";
import Header from "./components/layout/Header.js";
import Footer from "./components/layout/Footer.js";
import SpendStory from "./components/spend/SpendStory.js";
import SpendPlan from "./components/spend/SpendPlan.js";
import ManageTransactions from "./components/spend/ManageTransactions.js";
import rootReducer from "./reducers";

const store = configureStore({
  reducer: rootReducer,
});

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Switch>
          <Route
            exact
            path={process.env.PUBLIC_URL + "/"}
            component={SpendStory}
          ></Route>
          <Route path="/spend-story" component={SpendStory} />
          <Route path="/spend-plan" component={SpendPlan} />
          <Route path="/manage-transactions" component={ManageTransactions} />
        </Switch>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;