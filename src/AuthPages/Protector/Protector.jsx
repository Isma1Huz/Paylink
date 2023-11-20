import React from "react";
import { Navigate } from "react-router-dom";

function Protector({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    return <Navigate to="/register" replace />;
  }
  return children;
}

export default Protector;
