/* eslint-disable camelcase */
import { getRegisteredDevices, getUser } from "@api";
import { Container, Grid } from "@components";
import * as S from "./Home.styles";
import {
  useUserDevices,
  useRemoveUserDevice,
  useToggleDeviceStatus,
  useGlobalContext,
  useCheckToken,
  useWeatherData,
  useUser,
} from "@hooks";
import { queryClient } from "@lib/react-query";
import { useEffect } from "react";
import styled, { css } from "styled-components";

export const Home = () => {
  const { userId } = useGlobalContext();

  const userQuery = useUser(userId);
  const weatherQuery = useWeatherData(userQuery.data?.userAddress?.city);
  queryClient.setQueryDefaults(["weather", userQuery.data?.userAddress?.city], {
    // enabled: !!userQuery.data?.userAddress?.city,
  });
  const { userDevicesQuery } = useUserDevices(userId);
  const removeDevice = useRemoveUserDevice();
  const toggleDeviceStatus = useToggleDeviceStatus();

  useCheckToken();

  useEffect(() => {
    queryClient.prefetchQuery("registeredDevices", getRegisteredDevices);
    queryClient.prefetchQuery("user", () => getUser(userId));
  }, [userId]);

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

      <Grid>
        {userDevicesQuery.isLoading ? (
          <p>Loading...</p>
        ) : (
          userDevicesQuery.data.map(
            ({
              device: { name, photoUrl },
              is_on,
              _id,
              room,
              local: { description },
            }) => {
              return (
                <li key={_id}>
                  <S.DeviceCard>
                    <S.ImgWrapper>
                      <img src={photoUrl} alt={name} />
                    </S.ImgWrapper>
                    <S.DeviceInfoWrapper>
                      <S.DeviceName>{name}</S.DeviceName>
                      <S.DeviceInfoParagraph>
                        {description} | {room} | {is_on ? "ON" : "OFF"}
                      </S.DeviceInfoParagraph>
                    </S.DeviceInfoWrapper>
                    {/* {name} / tá on? {is_on ? "Sim" : "Nada"} */}
                    <button
                      onClick={() => {
                        toggleDeviceStatus.mutate({
                          deviceId: _id,
                          deviceStatus: is_on,
                        });
                      }}
                    >
                      {is_on ? "Desliga" : "Liga"}
                    </button>
                    {/* <button onClick={() => removeDevice.mutate(_id)}>
                      Remover
                    </button> */}
                  </S.DeviceCard>
                </li>
              );
            },
          )
        )}
      </Grid>
    </Container>
  );
};
