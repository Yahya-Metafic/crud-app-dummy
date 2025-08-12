import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token");

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
