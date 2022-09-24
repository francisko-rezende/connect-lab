import React from "react";
import PropTypes from "prop-types";
import * as S from "./InputWrapper.styles";

export const InputWrapper = ({ children }) => {
  return <S.Wrapper>{children}</S.Wrapper>;
};

InputWrapper.propTypes = {
  children: PropTypes.node,
};
