import React from "react";
import LoginButton from "../../components/profile/LoginButton.js";
import SignupButton from "../../components/profile/SignupButton.js";

const HomePage = (props) => {
  return (
    <div className="full-page mountain-background">
      <div className="login-box  p-5">
        <h1>Mālama Wai. Ho'oulu Waiwai</h1>
        <p>Manage your financial resources. Grow waiwai.</p>
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
