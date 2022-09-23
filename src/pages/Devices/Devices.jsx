import {
  useAddUserDevice,
  useGlobalContext,
  useRegisteredDevices,
  useUserDevices,
} from "@hooks";

export const Devices = () => {
  const devices = useRegisteredDevices();
  const addUserDevice = useAddUserDevice();
  const { userId } = useGlobalContext();
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
