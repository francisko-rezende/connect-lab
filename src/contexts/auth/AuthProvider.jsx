import React, { useState } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "./AuthContext";
import { useSessionStorage } from "@hooks";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useSessionStorage("token", null);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};
