import React from "react";
import PropTypes from "prop-types";
import { useAuth } from "@hooks";
import { Navigate } from "react-router-dom";
import { axiosInstance } from "@lib/axios";

export const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();

  if (token) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  return token ? children : <Navigate to={"/login"} />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};
