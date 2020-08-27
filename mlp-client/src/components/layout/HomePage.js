import React from "react";
import LoginButton from "../../components/profile/LoginButton.js";
import SignupButton from "../../components/profile/SignupButton.js";

const HomePage = (props) => {
  return (
    <div className="full-page mountain-background">
      <div className="login-box  p-5">
        <h1>Maximize your earnings</h1>
        <p>
          Waiwai teaches you how to track your spending to give you financial
          freedom.
        </p>
        <div class="button-box">
          <LoginButton />
          <br />
          <SignupButton />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
