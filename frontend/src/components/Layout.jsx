import React from "react";
import "../styles/Layout.css";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const { pathname } = useLocation();
  const isSettings = pathname.startsWith("/settings");

  return (
    <div className="app-layout">
      <Header />
      <div className="app-body">
        <Sidebar collapsed={isSettings} />

        <main className="app-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
