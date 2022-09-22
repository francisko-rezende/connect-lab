import { useAddUserDevice, useRegisteredDevices, useUserDevices } from "@hooks";
import { queryClient } from "@lib/react-query";

export const Devices = () => {
  const devices = useRegisteredDevices();
  const addUserDevice = useAddUserDevice();
  const userId = queryClient.getQueryData("user")._id;
  useUserDevices(userId);

  return (
    <>
      <h1>Devices</h1>
      <ul>
        {devices.isLoading
          ? "Carregando"
          : devices.data.map(({ name, _id }) => (
              <li key={_id}>
                {name}{" "}
                <button
                  onClick={() =>
                    addUserDevice.mutate({ userId, deviceId: _id })
                  }
                >
                  Adicionar
                </button>
              </li>
            ))}
      </ul>
    </>
  );
};
