import React from "react";
const loading =
  "https://cdn.auth0.com/blog/auth0-react-sample/assets/loading.svg";

const Loading = () => (
  <div className="full-page spinner">
    <div className="spinner">
      <img src={loading} alt="Loading" />
    </div>
  </div>
);

export default Loading;
