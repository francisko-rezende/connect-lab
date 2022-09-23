import { yupResolver } from "@hookform/resolvers/yup";
import {
  useAddUserDevice,
  useCheckToken,
  useGlobalContext,
  useLocationOptions,
  useRegisteredDevices,
  useUserDevices,
} from "@hooks";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const newUserDeviceSchema = yup.object({
  room: yup.string().required("Campo obrigatório"),
  location: yup.string().required("Campo obrigatório"),
});

export const Devices = () => {
  const devices = useRegisteredDevices();
  const addUserDevice = useAddUserDevice();
  const { userId } = useGlobalContext();
  useUserDevices(userId);
  useCheckToken();
  const locations = useLocationOptions();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(newUserDeviceSchema) });

  setValue("userId", userId);

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
                  onClick={() => {
                    setValue("deviceId", _id);
                  }}
                >
                  Adicionar
                </button>
              </li>
            ))}
      </ul>

      <form onSubmit={handleSubmit((data) => addUserDevice.mutate(data))}>
        <input {...register("userId")} style={{ display: "none" }} />
        <input {...register("deviceId")} style={{ display: "none" }} />

        <label htmlFor="room">Quarto</label>
        <input type="text" name="room" id="room" {...register("room")} />

        <label htmlFor="location">Local</label>
        <select
          defaultValue={""}
          name="location"
          id="location"
          {...register("location")}
        >
          <option value="" disabled>
            Selecione o local
          </option>
          {!locations.isLoading &&
            locations.data.map((location) => (
              <option key={location._id} value={location._id}>
                {location.description}
              </option>
            ))}
        </select>
        <button>Submeter</button>
      </form>
    </>
  );
};
