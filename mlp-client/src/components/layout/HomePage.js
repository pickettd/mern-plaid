import React, { useState } from "react";
import LoginButton from "../../components/profile/LoginButton.js";
import SignupButton from "../../components/profile/SignupButton.js";

const HomePage = (props) => {
  const [access, setAccess] = useState("");

  const onAccessChange = (event) => {
    let accessString = event.target.value.trim();
    setAccess(accessString);
  };

  return (
    <div className="full-page mountain-background">
      <div className="login-box  p-5">
        <h1>Mālama Wai. Ho'oulu Waiwai</h1>
        <p>Manage your financial resources. Grow waiwai.</p>
        <p>To login or signup, please enter your beta invite code:</p>
        <input
          value={access}
          onChange={onAccessChange}
          style={{ width: "25em" }}
        />
        {access === props.accessCheck ? (
          <>
            <p>(Invite code accepted)</p>
            <div className="button-box">
              <LoginButton />
              <br />
              <SignupButton />
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default HomePage;
