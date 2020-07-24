import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div>
        <Link to="/">(Icon)|</Link>
        <Link to="/spend-story">spend|</Link>
        save| borrow| plan
      </div>
    </>
  );
};

export default Footer;
