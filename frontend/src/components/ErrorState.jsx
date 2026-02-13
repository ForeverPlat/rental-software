import React from "react";
import "../styles/AsyncState.css";

const ErrorState = ({ message }) => {
  return (
    <div className="async-card error">
      <p className="async-text">{message}</p>
    </div>
  );
};

export default ErrorState;
