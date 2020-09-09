import React from "react";

const ColorHeader = (props) => {
  return (
    <>
      <div className="section-space"></div>
      <div className={"section " + props.colorClassName}>
        <div className="container">
          <div className="row">
            <div className="col">
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

// Note that there is probably a better way to do this with React hooks now
export default ColorHeader;
