import {
  Container,
  Grid,
  SearchBar,
  DeviceDetailsCard,
  AddDeviceDialog,
} from "@components";
import * as S from "./Devices.styles";
import {
  useCheckToken,
  useGlobalContext,
  useLocationOptions,
  useRegisteredDevices,
  useUserDevices,
  useAddUserDeviceForm,
} from "@hooks";

import { useState } from "react";
import { Toaster } from "react-hot-toast";

export const Devices = () => {
  const devices = useRegisteredDevices();
  const { userId } = useGlobalContext();
  useUserDevices(userId);
  useCheckToken();
  const locations = useLocationOptions();

  const [search, setSearch] = useState("");
  const [open, setIsOpen] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const { handleLinkDevice, register, setValue } = useAddUserDeviceForm({
    userId,
    setIsOpen,
  });

  const filteredDevices = search
    ? devices.data.filter(({ name }) =>
        name.toLowerCase().includes(search.toLowerCase()),
      )
    : devices.data;

  const handleSelectDevice = (name, _id) => {
    setSelectedDevice(name);
    setIsOpen(true);
    setValue("deviceId", _id);
  };

  return (
    <Container>
      <S.H2>Devices</S.H2>
      <SearchBar setSearch={setSearch} />
      <Grid>
        {devices.isLoading ? (
          <p>Carregando</p>
        ) : (
          filteredDevices.map(({ name, _id, photoUrl }) => (
            <DeviceDetailsCard
              key={_id}
              name={name}
              _id={_id}
              photoUrl={photoUrl}
              handleSelectDevice={() => handleSelectDevice(name, _id)}
            />
          ))
        )}
      </Grid>
      <Toaster />
      <AddDeviceDialog
        register={register}
        open={open}
        setIsOpen={setIsOpen}
        selectedDevice={selectedDevice}
        locations={locations}
        onSubmit={handleLinkDevice}
      />
    </Container>
  );
};
