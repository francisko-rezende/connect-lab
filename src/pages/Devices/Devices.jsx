// import { devices } from "../../assets/devices";
import { axiosInstance } from "@lib/axios";
import { useState } from "react";

export const Devices = () => {
  const [devices, setDevices] = useState(null);
  useState(async () => {
    const { data } = await axiosInstance.get("devices");
    setDevices(data);
  }, []);

  return (
    <>
      <h1>Devices</h1>
      <ul>
        {devices
          ? devices.map(({ name, _id }) => (
              <li key={_id}>
                {name}{" "}
                <button
                  onClick={() =>
                    axiosInstance.post("/userDevices", {
                      user: "632729c69bc4141442d087fa",
                      device: _id,
                      is_on: false,
                      local: "631b348a6f2d2f24a7c0c962",
                      room: "Sauna",
                    })
                  }
                >
                  Adicionar
                </button>
              </li>
            ))
          : "Carregando..."}
      </ul>
    </>
  );
};

// const deviceToAdd = {
//   user: "632729c69bc4141442d087fa",
//   device: _id,
//   is_on: false,
//   local: "631b348a6f2d2f24a7c0c962",
//   room: "Sauna",
// };
