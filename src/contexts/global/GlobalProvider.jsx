import React from "react";
import PropTypes from "prop-types";
import { GlobalContext } from "./GlobalContext";
import { useSessionStorage } from "@hooks";

export const GlobalProvider = ({ children }) => {
  const [userId, setUserId] = useSessionStorage("userId", null);
  const [theme, setTheme] = useSessionStorage("theme", "dark");

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <GlobalContext.Provider value={{ userId, setUserId, theme, toggleTheme }}>
      {children}
    </GlobalContext.Provider>
  );
};

GlobalProvider.propTypes = {
  children: PropTypes.node,
};
