import React from "react";
import { connect } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import ColorHeader from "../layout/ColorHeader";
const UserProfilePage = (props) => {
  const { user } = useAuth0();
  const { name } = user;
  const spendRangeDaysOptions = [7, 14, 30];
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
            <div className="col">You are using this date range:</div>
          </div>
          <div>
            <div className="form-group">
              <select
                className="selectpicker"
                data-style="btn btn-default"
                defaultValue={props.spendRangeDaysSelected}
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
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  spendRangeDaysSelected: state.plaid.spendRangeDaysSelected,
});

// Note that there is probably a better way to do this with React hooks now
export default connect(mapStateToProps, {})(UserProfilePage);
