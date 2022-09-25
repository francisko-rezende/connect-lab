import React from "react";
import PropTypes from "prop-types";
import * as S from "./Button.styles";

export const Button = ({ children }) => {
  return <S.Button>{children}</S.Button>;
};

Button.propTypes = {
  children: PropTypes.node,
};
