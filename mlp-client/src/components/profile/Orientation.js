import React from "react";
import ColorHeader from "../layout/ColorHeader";
//import { Link } from "react-router-dom";
//import Form from "react-bootstrap/Form";

const checkboxInstructions = [
  "Link your bank account (or more than one)",
  "Review transactions",
  "Setup your plan",
];

const Orientation = () => {
  return (
    <>
      <ColorHeader
        mainHeaderText="How to use"
        subHeaderText="Get the most out of Waiwai"
        colorClassName="section-header-green"
      />
      <div className="section">
        <div className="container">
          <p>
            I ka wā kahiko, wai (or water) was considered a valuable resource.
            Great care was taken to mālama this precious resource, ensuring
            proper management as it flowed from the mountains into loʻi to grow
            kalo and then into loko iʻa to grow fish.
          </p>
          <p>
            When there was plenty of water and that water was cared for, there
            was abundance or waiwai.
          </p>
          <p>
            Today, our financial resources are the wai. When we mālama our
            financial resources by tending to our budgets and managing our
            spending, we can start to grow abundance or waiwai.
          </p>
          <p>
            Waiwai was built to help you, but we need your help. Here’s a check
            list of three things that you need to do to get going right away:
          </p>
          {/*<Form>
          {checkboxInstructions.map((text) => (
            <div key={text} className="mb-3">
              <Form.Check type="checkbox" label={text} />
            </div>
          ))}
        </Form>*/}
          <ul>
            {checkboxInstructions.map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Orientation;
