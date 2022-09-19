import React, { useState } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "./AuthContext";
import { useSessionStorage } from "@hooks";
import { redirect } from "react-router-dom";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useSessionStorage("token", null);

  const signOut = () => {
    setToken("");
    redirect("/login");
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
