import { AuthContext } from "@contexts";
import { useContext, useState } from "react";

export const useAuth = () => {
  const { token, setToken } = useContext(AuthContext);

  return { token, setToken };
};
