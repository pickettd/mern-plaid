import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="mr-auto footer-nav">
            <Link to="/spend-story">spend</Link>
            <Link to="/save-story">save</Link>
            <Link to="/borrow-story">borrow</Link>
            <Link to="/plan-story">plan</Link>
          </div>
        </div>

        <div className="row">
          <p className="col-sm">
            <small>
              &copy;{new Date().getFullYear()} WAIWAI | All rights reserved |
              Terms of service | Privacy{" "}
            </small>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
