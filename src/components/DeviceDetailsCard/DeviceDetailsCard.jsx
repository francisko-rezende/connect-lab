import React from "react";
import PropTypes from "prop-types";
import { Button } from "@components";
import * as S from "./DeviceDetailsCard.styles";

export const DeviceDetailsCard = ({
  _id,
  name,
  photoUrl,
  handleSelectDevice,
}) => {
  return (
    <S.Li key={_id}>
      <S.ImgWrapper>
        <img src={photoUrl} alt={name} />
      </S.ImgWrapper>
      {name}{" "}
      <Button variant="regular" onClick={handleSelectDevice}>
        Adicionar
      </Button>
    </S.Li>
  );
};

DeviceDetailsCard.propTypes = {
  _id: PropTypes.string,
  name: PropTypes.string,
  photoUrl: PropTypes.string,
  handleSelectDevice: PropTypes.func,
};
