import React from "react";
import "../styles/QuickActions.css";
import { BsFillCalendarPlusFill } from "react-icons/bs";
import { IoPersonAddSharp } from "react-icons/io5";
import { FaBox } from "react-icons/fa";

const QuickActions = () => {
  return (
    <div className="quick-actions-card">
      <h3 className="quick-actions-title">Quick Actions</h3>

      <div className="quick-actions-list">
        <button className="quick-action primary">
          <span className="icon">
            <BsFillCalendarPlusFill />
          </span>
          <span>Create Booking</span>
        </button>

        <div className="divider" />

        <button className="quick-action">
          <span className="icon">
            <IoPersonAddSharp />
          </span>
          <span>Add Customer</span>
        </button>

        <div className="divider" />

        <button className="quick-action">
          <span className="icon">
            <FaBox />
          </span>
          <span>Add Inventory</span>
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
