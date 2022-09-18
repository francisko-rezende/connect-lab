import React, { useState } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [hasSignedIn, setHasSignedIn] = useState(false);

  const toggleSignedIn = () => {
    setHasSignedIn((hasSignedIn) => !hasSignedIn);
  };

  return (
    <AuthContext.Provider value={{ hasSignedIn, toggleSignedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};
