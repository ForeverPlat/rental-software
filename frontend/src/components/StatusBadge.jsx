import React from "react";
import "../styles/StatusBadge.css";

const STATUS_MAP = {
  returned: "green",
  paid: "green",
  cancelled: "yellow",
  overdue: "red",
};

const StatusBadge = ({ label, variant }) => {
  let finalVariant = variant;

  if (!finalVariant && label) {
    const key = label.toLowerCase();
    finalVariant = STATUS_MAP[key] || "default";
  }

  return (
    <span className={`status-badge ${finalVariant || "default"}`}>{label}</span>
  );
};

export default StatusBadge;
