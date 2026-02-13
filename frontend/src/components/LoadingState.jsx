import React from "react";
import "../styles/AsyncState.css";

const LoadingState = ({ message = "Loading..." }) => {
  return (
    <div className="async-card">
      <div className="spinner" />
      <p className="async-text">{message}</p>
    </div>
  );
};

export default LoadingState;
