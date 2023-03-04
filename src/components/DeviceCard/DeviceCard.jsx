/* eslint-disable camelcase */
import { StatusIcon } from "@components";
import PropTypes from "prop-types";
import * as S from "./DeviceCard.styles";

export const DeviceCard = ({
  item,
  handleCardClick,
  handleToggleDeviceStatus,
}) => {
  const {
    device: { photoUrl, name },
    local: { description },
    room,
    is_on,
  } = item;

  return (
    <li>
      <S.DeviceCard role="button" onClick={handleCardClick}>
        <S.ImgWrapper>
          <img src={photoUrl} alt={name} />
        </S.ImgWrapper>
        <S.DeviceInfoWrapper>
          <S.DeviceName>{name}</S.DeviceName>
          <S.DeviceInfoParagraph>
            {description} | {room} | {is_on ? "ON" : "OFF"}
          </S.DeviceInfoParagraph>
        </S.DeviceInfoWrapper>
        <S.StatusButtonWrapper role="button" onClick={handleToggleDeviceStatus}>
          <StatusIcon isOn={is_on} />
        </S.StatusButtonWrapper>
      </S.DeviceCard>
    </li>
  );
};

DeviceCard.propTypes = {
  item: PropTypes.object,
  handleCardClick: PropTypes.func,
  handleToggleDeviceStatus: PropTypes.func,
};
