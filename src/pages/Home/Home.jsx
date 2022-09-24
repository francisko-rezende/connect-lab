/* eslint-disable camelcase */
import { getRegisteredDevices, getUser, getWeatherData } from "@api";
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
import { Link } from "react-router-dom";

export const Home = () => {
  const { userId } = useGlobalContext();

  const userQuery = useUser(userId);
  const weatherQuery = useWeatherData(userQuery.data?.userAddress?.city);
  queryClient.setQueryDefaults(["weather", userQuery.data?.userAddress?.city], {
    enabled: !!userQuery.data?.userAddress?.city,
  });
  const { userDevicesQuery } = useUserDevices(userId);
  useCheckToken();
  const removeDevice = useRemoveUserDevice();
  const toggleDeviceStatus = useToggleDeviceStatus();

  useEffect(() => {
    queryClient.prefetchQuery("registeredDevices", getRegisteredDevices);
    queryClient.prefetchQuery("user", () => getUser(userId));
  }, [userId]);

  return (
    <>
      <div>
        <h1>Home</h1>
        <Link to={"devices"}>Devices</Link>
        <Link to={"perfil"}>Perfil</Link>
      </div>

      {!userQuery.isLoading &
        !userQuery.isError &
        !weatherQuery.isLoading &
        !weatherQuery.isError && (
        <div>
          <p>{Math.round(weatherQuery.data.main.temp)} ºC</p>
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
        </div>
      )}

      <ul>
        {userDevicesQuery.isLoading ? (
          <p>Loading...</p>
        ) : (
          userDevicesQuery.data.map(({ device: { name }, is_on, _id }) => {
            return (
              <li key={_id}>
                {name} / tá on? {is_on ? "Sim" : "Nada"}
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
                <button onClick={() => removeDevice.mutate(_id)}>
                  Remover
                </button>
              </li>
            );
          })
        )}
      </ul>
    </>
  );
};
