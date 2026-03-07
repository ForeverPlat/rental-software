import React from "react";
import { Outlet } from "react-router-dom";
import "../styles/SettingsLayout.css";
import SettingsSidebar from "./SettingsSidebar";

const SettingsLayout = () => {
  return (
    <div className="settings-layout">
      <SettingsSidebar />
      <div className="settings-content">
        <Outlet />
      </div>
    </div>
  );
};

export default SettingsLayout;
