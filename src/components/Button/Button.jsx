import React from "react";
import PropTypes from "prop-types";
import * as S from "./Button.styles";

export const Button = ({ children, variant }) => {
  return <S.Button variant={variant}>{children}</S.Button>;
};

Button.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.string,
};
