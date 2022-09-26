import * as S from "./Link.styles";
import PropTypes from "prop-types";

// todo change component name

export const Link = ({ children, to, variant, className }) => {
  return (
    <S.Link to={to} variant={variant} className={className}>
      {children}
    </S.Link>
  );
};

Link.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string,
  variant: PropTypes.string,
  className: PropTypes.string,
};
