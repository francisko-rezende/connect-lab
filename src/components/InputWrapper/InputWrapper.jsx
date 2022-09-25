import React from "react";
import PropTypes from "prop-types";
import * as S from "./InputWrapper.styles";

export const InputWrapper = ({ children, className }) => {
  return <S.Wrapper className={className}>{children}</S.Wrapper>;
};

InputWrapper.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
