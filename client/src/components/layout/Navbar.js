import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div className="navbar-fixed z-depth-2">
        <nav className="z-depth-0 blue darken-4">
          <div className="nav-wrapper container">
            <Link
              to="/"
              className="col s5 brand-logo left"
            >
              {process.env.REACT_APP_NAME}
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
