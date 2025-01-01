import React from "react";
import Navbar from "../components/navbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <dic className="container">
        <Outlet />
      </dic>
    </div>
  );
};

export default RootLayout;
