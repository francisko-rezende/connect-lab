import * as S from "./Link.styles";
import PropTypes from "prop-types";

export const Link = ({ children, to }) => {
  return <S.Link to={to}>{children}</S.Link>;
};

Link.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string,
};
