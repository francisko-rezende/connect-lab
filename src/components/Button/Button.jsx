import React from "react";
import PropTypes from "prop-types";
import * as S from "./Button.styles";

export const Button = ({ children, variant, ...props }) => {
  return (
    <S.Button variant={variant} {...props}>
      {children}
    </S.Button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.string,
};
