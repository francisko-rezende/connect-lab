import { axiosInstance } from "@lib/axios";
import { Link } from "react-router-dom";

export const Home = () => {
  // const getUser = async () => {
  //   const res = await axiosInstance.get(`/users/631b6e3e61ef65fb3859152f`);
  // };

  // const getUserDevices = async () => {
  //   const res = await axiosInstance.get(
  //     `/userDevices/user/631b6e3e61ef65fb3859152f`,
  //   );
  // };

  return (
    <>
      <div>
        <h1>Home</h1>
        <Link to={"devices"}>Devices</Link>
        <Link to={"perfil"}>Perfil</Link>
      </div>
      <div>
        {/* <button onClick={getUserDevices}>Devices do usuário</button> */}
      </div>
    </>
  );
};
