import React from "react";
import "../styles/StatusBadge.css";

const STATUS_MAP = {
  returned: "green",
  paid: "green",
  cancelled: "yellow",
  overdue: "red",
};

const StatusBadge = ({ label }) => {
  const key = label.toLowerCase();
  const variant = STATUS_MAP[key] || "default";

  return <span className={`status-badge ${variant}`}>{label}</span>;
};

export default StatusBadge;
