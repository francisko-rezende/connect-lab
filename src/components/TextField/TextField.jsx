import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import * as S from "./TextField.styles";

export const TextField = forwardRef(
  (
    { className, errorMessage, name, label, type, isFullWidth, ...props },
    forwardedRef,
  ) => (
    <S.Wrapper className={className} isFullWidth={isFullWidth}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type || "text"}
        name={name}
        id={name}
        {...props}
        ref={forwardedRef}
      />
      {errorMessage && <p>{errorMessage}</p>}
    </S.Wrapper>
  ),
);

TextField.displayName = "TextField";

TextField.propTypes = {
  errorMessage: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  isFullWidth: PropTypes.bool,
};
