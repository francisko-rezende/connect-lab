/* eslint-disable camelcase */
import { getRegisteredDevices, getUser } from "@api";
import {
  Button,
  Container,
  Dialog,
  DialogContent,
  Grid,
  StatusIcon,
} from "@components";
import * as S from "./Home.styles";
import {
  useUserDevices,
  useRemoveUserDevice,
  useToggleDeviceStatus,
  useGlobalContext,
  useCheckToken,
  useWeatherData,
  useUser,
  useLocationOptions,
} from "@hooks";
import { queryClient } from "@lib/react-query";
import { useEffect, useState } from "react";

export const Home = () => {
  const { userId } = useGlobalContext();
  const locations = useLocationOptions();

  const userQuery = useUser(userId);
  const weatherQuery = useWeatherData(userQuery.data?.userAddress?.city);
  queryClient.setQueryDefaults(["weather", userQuery.data?.userAddress?.city], {
    enabled: !!userQuery.data?.userAddress?.city,
  });
  const userDevicesQuery = useUserDevices(userId);
  const removeDevice = useRemoveUserDevice();
  const toggleDeviceStatus = useToggleDeviceStatus();
  const [isDialogOpen, setIsDialogOpen] = useState(true);

  const [locationToShow, setLocationToShow] = useState(null);

  useCheckToken();

  useEffect(() => {
    queryClient.prefetchQuery("registeredDevices", getRegisteredDevices);
    queryClient.prefetchQuery("user", () => getUser(userId));
  }, [userId]);

  const [selectedDeviceId, setSelectedDeviceId] = useState(null);

  const filteredDevices = locationToShow
    ? userDevicesQuery.data.filter(
        ({ local: { description } }) => description === locationToShow,
      )
    : userDevicesQuery.data;

  const selectedDevice = queryClient.getQueryData([
    "userDevices",
    selectedDeviceId,
  ]);

  return (
    <Container>
      {!weatherQuery.isLoading & !userQuery.isLoading ? (
        <S.WeatherWrapper>
          <S.Temperature>
            {Math.round(weatherQuery.data.main.temp)} ºC
          </S.Temperature>
          <p style={{ textTransform: "capitalize" }}>
            {weatherQuery.data.weather[0].description}
          </p>
          <img
            src={`https://openweathermap.org/img/wn/${weatherQuery.data.weather[0].icon}@2x.png`}
            alt={`tempo ${weatherQuery.data.weather[0].description}`}
          />
          <p>
            {userQuery.data.userAddress.city},{" "}
            {userQuery.data.userAddress.state}
          </p>
          <p>
            Sensação térmica: {Math.round(weatherQuery.data.main.feels_like)}ºC{" "}
          </p>
        </S.WeatherWrapper>
      ) : (
        <p>Loading...</p>
      )}
      <S.FilterButtonsWrapper>
        {!locations.isLoading &&
          locations.data.map(({ description, _id }) => (
            <Button
              variant="regular"
              key={_id}
              onClick={() => setLocationToShow(description)}
            >
              {description}
            </Button>
          ))}
        <Button variant="regular" onClick={() => setLocationToShow(null)}>
          Todos
        </Button>
      </S.FilterButtonsWrapper>
      <Grid>
        {userDevicesQuery.isLoading ? (
          <p>Loading...</p>
        ) : (
          filteredDevices.map((item) => {
            return (
              <li key={item._id}>
                <S.DeviceCard
                  role="button"
                  onClick={() => {
                    setSelectedDeviceId(item._id);
                    setIsDialogOpen(true);
                  }}
                >
                  <S.ImgWrapper>
                    <img src={item.device.photoUrl} alt={item.device.name} />
                  </S.ImgWrapper>
                  <S.DeviceInfoWrapper>
                    <S.DeviceName>{item.device.name}</S.DeviceName>
                    <S.DeviceInfoParagraph>
                      {item.local.description} | {item.room} |{" "}
                      {item.is_on ? "ON" : "OFF"}
                    </S.DeviceInfoParagraph>
                  </S.DeviceInfoWrapper>
                  <S.StatusButtonWrapper
                    role="button"
                    onClick={(ev) => {
                      ev.stopPropagation();
                      toggleDeviceStatus.mutate({
                        deviceId: item._id,
                        deviceStatus: item.is_on,
                      });
                    }}
                  >
                    <StatusIcon isOn={item.is_on} />
                  </S.StatusButtonWrapper>
                </S.DeviceCard>
              </li>
            );
          })
        )}
      </Grid>

      {selectedDevice && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <S.ContentWrapper>
              <S.CustomDialogTitle>
                {selectedDevice.device.name}
              </S.CustomDialogTitle>
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
                  onClick={() => {
                    toggleDeviceStatus.mutate({
                      deviceId: selectedDevice._id,
                      deviceStatus: selectedDevice.is_on,
                    });
                  }}
                >
                  <StatusIcon isOn={selectedDevice.is_on} />
                </S.StatusButtonWrapper>
              </S.StatusWrapper>

              <S.H4>Informações do dispositivo</S.H4>
              <S.DetailsWrapper>
                <p>ID virtual: {selectedDevice.device.info.virtual_id}</p>
                <p>Endereço IP: {selectedDevice.device.info.ip_address}</p>
                <p>Endereço MAC: {selectedDevice.device.info.mac_address}</p>
                <p>Força do sinal: {selectedDevice.device.info.signal}</p>
              </S.DetailsWrapper>
              <Button
                variant="regular"
                onClick={() =>
                  removeDevice.mutate({
                    id: selectedDevice._id,
                    setIsDialogOpen,
                  })
                }
              >
                Remover
              </Button>
            </S.ContentWrapper>
          </DialogContent>
        </Dialog>
      )}
    </Container>
  );
};
