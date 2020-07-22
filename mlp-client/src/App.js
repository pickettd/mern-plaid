import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Header from './components/layout/Header.js'
import Footer from './components/layout/Footer.js'
import SpendStory from './components/spend/SpendStory.js'
import SpendPlan from './components/spend/SpendPlan.js'
import ManageTransactions from './components/spend/ManageTransactions.js'

function App() {
  return (<>
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.js</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </header>
          </div>
        </Route>
        <Route path="/spend-story" component={SpendStory} />
        <Route path="/spend-plan" component={SpendPlan} />
        <Route path="/manage-transactions" component={ManageTransactions} />
      </Switch>
      <Footer />
    </Router>
  </>);
}

export default App;
