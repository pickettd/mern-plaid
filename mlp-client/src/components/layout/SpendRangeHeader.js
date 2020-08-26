import React from "react";
import { connect } from "react-redux";

const SpendRangeHeader = (props) => {
  return (
    <>
      <div className="section-space"></div>
      <div className="section section-header-generic">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-6 offset-sm-3 justify-content-center text-center">
              <h1>
                {props.mainHeaderText}
                <br />
                <span className="small bottom">{props.subHeaderText}</span>
              </h1>
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
