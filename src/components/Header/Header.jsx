import React from "react";
import * as S from "./Header.styles";
import PropTypes from "prop-types";
import { Container } from "@components";

export const Header = ({ children }) => {
  return (
    <S.Header>
      <Container>
        <S.Wrapper>{children}</S.Wrapper>
      </Container>
    </S.Header>
  );
};

Header.propTypes = {
  children: PropTypes.node,
};
