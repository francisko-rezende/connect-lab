import { AuthContext } from "@contexts";
import { useContext, useState } from "react";

export const useAuth = () => {
  const { hasSignedIn, toggleSignedIn } = useContext(AuthContext);

  return { hasSignedIn, toggleSignedIn };
};
