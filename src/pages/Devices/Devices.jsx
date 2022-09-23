import {
  useAddUserDevice,
  useCheckToken,
  useGlobalContext,
  useLocationOptions,
  useRegisteredDevices,
  useUserDevices,
} from "@hooks";
import { useState } from "react";

export const Devices = () => {
  const devices = useRegisteredDevices();
  const addUserDevice = useAddUserDevice();
  const { userId } = useGlobalContext();
  useUserDevices(userId);
  useCheckToken();
  const [locationId, setLocationId] = useState(null);
  const [room, setRoom] = useState(null);
  const locations = useLocationOptions();

  // todo location select input

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
                    addUserDevice.mutate({
                      userId,
                      deviceId: _id,
                      locationId,
                      room,
                    })
                  }
                >
                  Adicionar
                </button>
              </li>
            ))}
      </ul>
      <form>
        <label htmlFor="room">Quarto</label>
        <input
          type="text"
          name="room"
          id="room"
          onChange={(ev) => setRoom(ev.target.value)}
        />

        <label htmlFor="location">Local</label>
        <select
          name="location"
          id="location"
          onChange={(e) => setLocationId(e.target.value)}
        >
          {!locations.isLoading &&
            locations.data.map((location) => (
              <option key={location._id} value={location._id}>
                {location.description}
              </option>
            ))}
        </select>
      </form>
    </>
  );
};
