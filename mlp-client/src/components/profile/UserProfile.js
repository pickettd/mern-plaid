import React from "react";

const UserProfile = (props) => {
  return (
    <>
      <div>This is the User Profile</div>
      <div>Name: {props.auth.user.name}</div>
    </>
  );
};

export default UserProfile;
