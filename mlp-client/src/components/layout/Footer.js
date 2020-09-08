import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="m-auto footer-nav">
            <Link to="/spend-story">spend story</Link>
            <Link to="/manage-transactions">transactions</Link>
            <Link to="/spend-plan">plan</Link>
          </div>
        </div>

        <div className="row text-center">
          <p className="col-sm">
            <small>
              &copy;{new Date().getFullYear()} WAIWAI | Ua kukulu ʻia i Hawaiʻi
              me ke aloha nui
            </small>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
