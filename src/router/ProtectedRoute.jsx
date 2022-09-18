import React from "react";
import PropTypes from "prop-types";
import { useAuth } from "@hooks";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const { hasSignedIn } = useAuth();

  return hasSignedIn ? children : <Navigate to={"/login"} />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};
