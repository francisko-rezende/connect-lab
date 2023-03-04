import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  InputWrapper,
  TextField,
} from "@components";
import * as S from "./AddDeviceDialog.styles";

export const AddDeviceDialog = ({
  register,
  open,
  setIsOpen,
  selectedDevice,
  locations,
  onSubmit,
}) => {
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent>
        <S.ContentWrapper>
          <DialogTitle>{selectedDevice}</DialogTitle>
          <S.Form onSubmit={onSubmit}>
            <input {...register("userId")} style={{ display: "none" }} />
            <input {...register("deviceId")} style={{ display: "none" }} />
            <TextField name="room" label="Quarto" {...register("room")} />
            {/* <InputWrapper>
              <label htmlFor="room">Quarto</label>
              <input type="text" name="room" id="room" {...register("room")} />
            </InputWrapper> */}

            <InputWrapper>
              <label htmlFor="location">Local</label>
              <select
                defaultValue={""}
                name="location"
                id="location"
                {...register("location")}
              >
                <option value="" disabled>
                  Selecione o local
                </option>
                {!locations.isLoading &&
                  locations.data.map((location) => (
                    <option
                      key={location.locationId}
                      value={location.locationId}
                    >
                      {location.description}
                    </option>
                  ))}
              </select>
            </InputWrapper>

            <S.ButtonsWrapper>
              <DialogClose asChild>
                <Button variant="underlined">Cancelar</Button>
              </DialogClose>
              <Button variant="regular">Submeter</Button>
            </S.ButtonsWrapper>
          </S.Form>
        </S.ContentWrapper>
      </DialogContent>
    </Dialog>
  );
};

AddDeviceDialog.propTypes = {
  register: PropTypes.func,
  setIsOpen: PropTypes.func,
  open: PropTypes.boolean,
  selectedDevice: PropTypes.object,
  locations: PropTypes.object,
  onSubmit: PropTypes.func,
};
