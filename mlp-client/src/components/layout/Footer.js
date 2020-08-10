import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="main-footer">
      <div className="container">
        <div className="row">
          {/*Column 1*/}
          <div className="col">
            <h4>Footer</h4>
            <ul className="footer-list">
              <li>item 1</li>
              <li>item 2</li>
              <li>item 3</li>
            </ul>
          </div>
          {/*Column 2*/}
          {/*Column 3*/}
        </div>
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} WAIWAI | All rights reserved |
            Terms of service | Privacy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
