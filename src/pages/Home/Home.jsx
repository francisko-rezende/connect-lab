/* eslint-disable camelcase */
import { axiosInstance } from "@lib/axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  // const getUser = async () => {
  //   const res = await axiosInstance.get(`/users/631b6e3e61ef65fb3859152f`);
  // };

  const [userDevices, setUserDevices] = useState(null);

  const getUserDevices = async (id) => {
    const res = await axiosInstance.get(`/userDevices/user/${id}`);
    return res;
  };

  useEffect(() => {
    getUserDevices("632729c69bc4141442d087fa").then((res) =>
      setUserDevices(res.data),
    );
  }, []);

  const toggleDeviceStatus = async (id, deviceStatus) => {
    console.log(!deviceStatus, id);
    const res = await axiosInstance.put(`/userDevices/${id}`, {
      is_on: !deviceStatus,
    });
  };

  const removeDevice = (id) => {
    axiosInstance.delete(`/userDevices/${id}`);
  };

  return (
    <>
      <div>
        <h1>Home</h1>
        <Link to={"devices"}>Devices</Link>
        <Link to={"perfil"}>Perfil</Link>
      </div>
      <ul>
        {userDevices &&
          userDevices.map(({ device: { name }, is_on, _id }) => (
            <li key={_id}>
              {name} / tá on? {is_on ? "Sim" : "Nada"}
              <button onClick={() => toggleDeviceStatus(_id, is_on)}>
                {is_on ? "Desliga" : "Liga"}
              </button>
              <button onClick={() => removeDevice(_id)}>Remover</button>
            </li>
          ))}
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
