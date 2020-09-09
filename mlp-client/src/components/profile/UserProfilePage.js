import React from "react";
import { connect } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import ColorHeader from "../layout/ColorHeader";
import { setDaysRange } from "../../actions/authActions";

const UserProfilePage = (props) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const { spendRangeDays } = props;

  const onClick = (number) => {
    getAccessTokenSilently().then((accessToken) => {
      props.setDaysRange(accessToken, number);
    });
  };

  //const spendRangeDaysOptions = [7, 14, 30];
  return (
    <>
      <ColorHeader
        mainHeaderText="Profile"
        subHeaderText="Manage your account"
        colorClassName="section-header-blue"
      />
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <img className="profile-pic" src={user.picture} alt={user.name} />
            </div>

            <div className="offset-sm-1 col-sm-4">
              <label>Name:</label> {user.name}
              <label>Email:</label> {user.email}
              <label>You are using this date range:</label> {spendRangeDays}{" "}
              days
              <div className="row">
                <div className="col">
                  <label>Change your range:</label>{" "}
                  <button
                    disabled={spendRangeDays === 30 ? true : false}
                    onClick={() => onClick(30)}
                  >
                    30 days
                  </button>
                  <button
                    disabled={spendRangeDays === 14 ? true : false}
                    onClick={() => onClick(14)}
                  >
                    14 days
                  </button>
                  <button
                    disabled={spendRangeDays === 7 ? true : false}
                    onClick={() => onClick(7)}
                  >
                    7 days
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/*<div>
            <div className="form-group">
              <select
                className="selectpicker"
                data-style="btn btn-default"
                value={props.spendRangeDays}
                readOnly={true}
              >
                <option disabled value={0}>
                  {" "}
                  Choose date range
                </option>
                {spendRangeDaysOptions.map((daysOption, i) => {
                  return (
                    <option key={i} value={daysOption}>
                      {daysOption + " days"}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div>

            <button onClick={() => onClick(14)}>14 days</button>
            <button onClick={() => onClick(7)}>7 days</button>
          </div>*/}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  spendRangeDays: state.auth.spendRangeDays,
});
const mapDispatchToProps = { setDaysRange };

// Note that there is probably a better way to do this with React hooks now
export default connect(mapStateToProps, mapDispatchToProps)(UserProfilePage);
