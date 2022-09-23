/* eslint-disable camelcase */
import { getRegisteredDevices, getUser } from "@api";
import {
  useUserDevices,
  useRemoveUserDevice,
  useToggleDeviceStatus,
  useGlobalContext,
  useCheckToken,
} from "@hooks";
import { axiosInstance } from "@lib/axios";
import { queryClient } from "@lib/react-query";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  const { userId } = useGlobalContext();

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
        <button
          onClick={async () => {
            const res = await axiosInstance.get("/locals");

            console.log(res);
          }}
        >
          Devices do usuário
        </button>
      </ul>
    </>
  );
};
