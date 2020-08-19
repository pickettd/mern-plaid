import React from "react";
import { connect } from "react-redux";

const UserProfilePage = (props) => {
  return (
    <>
      <div>This is the User Profile Page</div>
      <div>Name: {props.auth.user.name}</div>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

// Note that there is probably a better way to do this with React hooks now
export default connect(mapStateToProps, {})(UserProfilePage);
