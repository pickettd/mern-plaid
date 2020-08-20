import React from "react";
import LoginButton from "../../components/profile/LoginButton.js";
import SignupButton from "../../components/profile/SignupButton.js";

const HomePage = (props) => {
  return (
    <div className="full-page mountain-background">
      <div className="login-box  p-5">
        <LoginButton />
        <br />
        <SignupButton />
      </div>
    </div>
  );
};

export default HomePage;
