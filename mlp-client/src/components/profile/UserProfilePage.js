import React from "react";
import { connect } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import ColorHeader from "../layout/ColorHeader";
import { setDaysRange } from "../../actions/authActions";

const UserProfilePage = (props) => {
  const onClick = (number) => {
    props.setDaysRange(number);
  };

  const { user } = useAuth0();
  //const spendRangeDaysOptions = [7, 14, 30];
  return (
    <>
      <ColorHeader
        mainHeaderText="Profile"
        subHeaderText=""
        colorClassName="section-header-green"
      />
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col">
              <img src={user.picture} alt={user.name} />
            </div>
          </div>
          <div className="row">
            <div className="col">Name: {user.name}</div>
          </div>
          <div className="row">
            <div className="col">Email: {user.email}</div>
          </div>
          <div className="row">
            <div className="col">
              You are using this date range: {props.spendRangeDays} days
            </div>
          </div>
          <div className="row">
            <div className="col">
              Change your range:{" "}
              <button onClick={() => onClick(30)}>30 days</button>
              <button onClick={() => onClick(14)}>14 days</button>
              <button onClick={() => onClick(7)}>7 days</button>
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
