import { AuthContext } from "@contexts";
import { useContext, useState } from "react";

export const useAuth = () => {
  const { token, setToken, signOut } = useContext(AuthContext);

  return { token, setToken, signOut };
};
