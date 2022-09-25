import React from "react";
import PropTypes from "prop-types";

import * as S from "./Grid.styles";

export const Grid = ({ children }) => {
  return <S.Ul>{children}</S.Ul>;
};

Grid.propTypes = {
  children: PropTypes.node,
};
