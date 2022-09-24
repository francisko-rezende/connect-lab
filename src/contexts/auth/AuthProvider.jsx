import React, { useState } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "./AuthContext";
import { useSessionStorage } from "@hooks";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useSessionStorage("token", null);

  const signOut = () => {
    setToken(null);
    sessionStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ token, setToken, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};
