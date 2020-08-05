import React from "react";
import { connect } from "react-redux";

const SpendRangeHeader = (props) => {
  const spendRangeDaysOptions = [7, 14, 30];
  return (
    <>
      <div className="section-space"></div>
      <div className="section section-header-generic">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="container">
                <div className="row">
                  <div className="col-md-6 col-sm-6">
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
                <div className="row">
                  <h1>
                    {props.mainHeaderText}
                    <br />
                    <span className="small bottom">{props.subHeaderText}</span>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  spendRangeDaysSelected: state.plaid.spendRangeDaysSelected,
});

// Note that there is probably a better way to do this with React hooks now
export default connect(mapStateToProps, {})(SpendRangeHeader);
