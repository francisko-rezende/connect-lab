import { Button, Dialog, DialogContent, StatusIcon } from "@components";
import PropTypes from "prop-types";
import * as S from "./DeviceDetailsDialog.styles";

export const DeviceDetailsDialog = ({
  isDialogOpen,
  selectedDevice,
  setIsDialogOpen,
  handleRemoveDevice,
  handleToggleDeviceStatus,
}) => {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent>
        <S.ContentWrapper>
          {/* <S.CustomDialogTitle>
            {selectedDevice.device.name}
          </S.CustomDialogTitle> */}
          <S.H3>{selectedDevice.device.madeBy}</S.H3>
          <S.ImgWrapper>
            <img
              src={selectedDevice.device.photoUrl}
              alt={selectedDevice.device.name}
            />
          </S.ImgWrapper>

          <S.StatusWrapper>
            <S.Status>
              Dispositivo {selectedDevice.is_on ? "Ligado" : "Desligado"}
            </S.Status>
            <S.StatusButtonWrapper
              role="button"
              onClick={handleToggleDeviceStatus}
            >
              <StatusIcon isOn={selectedDevice.is_on} />
            </S.StatusButtonWrapper>
          </S.StatusWrapper>

          <S.H4>Informações do dispositivo</S.H4>
          <div>
            <p>ID virtual: {selectedDevice.device.info.virtual_id}</p>
            <p>Endereço IP: {selectedDevice.device.info.ip_address}</p>
            <p>Endereço MAC: {selectedDevice.device.info.mac_address}</p>
            <p>Força do sinal: {selectedDevice.device.info.signal}</p>
          </div>
          <Button variant="regular" onClick={handleRemoveDevice}>
            Remover
          </Button>
        </S.ContentWrapper>
      </DialogContent>
    </Dialog>
  );
};

DeviceDetailsDialog.propTypes = {
  isDialogOpen: PropTypes.bool,
  selectedDevice: PropTypes.object,
  setIsDialogOpen: PropTypes.func,
  handleRemoveDevice: PropTypes.func,
  handleToggleDeviceStatus: PropTypes.func,
};
