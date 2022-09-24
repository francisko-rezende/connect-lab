import PropTypes from "prop-types";
import * as S from "./Container.styles";

export const Container = ({ children }) => {
  return <S.Container>{children}</S.Container>;
};

Container.propTypes = {
  children: PropTypes.node,
};
