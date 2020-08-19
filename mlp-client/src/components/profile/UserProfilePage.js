import React from "react";
import { connect } from "react-redux";

const UserProfilePage = (props) => {
  return (
    <>
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col">
              This is the User Profile <br /> {props.auth.user.name}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

// Note that there is probably a better way to do this with React hooks now
export default connect(mapStateToProps, {})(UserProfilePage);
