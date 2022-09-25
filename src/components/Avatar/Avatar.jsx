import PropTypes from "prop-types";
import * as S from "./Avatar.styles";

const getInitials = (name) => {
  const splitName = name.split(" ");

  const firstName = splitName[0];
  const lastName = splitName[splitName.length - 1];

  return `${firstName[0]}${lastName[0].toUpperCase()}`;
};

export const Avatar = ({ src, name }) => {
  console.log(getInitials(name));
  return (
    <S.Avatar>
      <S.AvatarImage src={src} alt={name} />
      <S.AvatarFallback delayMs={0}>{getInitials(name)}</S.AvatarFallback>
    </S.Avatar>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string,
};
