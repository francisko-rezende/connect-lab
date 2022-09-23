import React from "react";
import PropTypes from "prop-types";
import { GlobalContext } from "./GlobalContext";
import { useSessionStorage } from "@hooks";

export const GlobalProvider = ({ children }) => {
  const [userId, setUserId] = useSessionStorage("userId", null);

  return (
    <GlobalContext.Provider value={{ userId, setUserId }}>
      {children}
    </GlobalContext.Provider>
  );
};

GlobalProvider.propTypes = {
  children: PropTypes.node,
};
