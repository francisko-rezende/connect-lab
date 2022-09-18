import { devices } from "../../assets/devices";
import { axiosInstance } from "@lib/axios";
import { useState } from "react";

export const Devices = () => {
  // const [devices, setDevices] = useState(null);
  // useState(async () => {
  //   const { data } = await axiosInstance.get("devices");
  //   setDevices(data);
  // }, []);

  return (
    <>
      <h1>Devices</h1>
      <ul>
        {devices
          ? devices.map(({ name, _id }) => <li key={_id}>{name}</li>)
          : "Carregando..."}
      </ul>
    </>
  );
};
