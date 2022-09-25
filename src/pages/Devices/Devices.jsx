import {
  Button,
  Container,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  Grid,
  InputWrapper,
} from "@components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as S from "./Devices.styles";
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
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

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

  const getDelay = () => Math.random() * (20 - 5) + 5;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(newUserDeviceSchema) });

  setValue("userId", userId);

  const [search, setSearch] = useState("");
  const [open, setIsOpen] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);

  const filteredDevices = search
    ? devices.data.filter(({ name }) =>
        name.toLowerCase().includes(search.toLowerCase()),
      )
    : devices.data;

  return (
    <Container>
      <S.H2>Devices</S.H2>
      <S.SearchBarWrapper>
        <S.Label htmlFor="search">Nome do dispositivo</S.Label>
        <S.Search
          type="search"
          id="search"
          placeholder="Buscar pelo nome do dispositivo"
          onChange={(ev) => {
            const searchTerm = ev.target.value;
            setSearch(searchTerm);
          }}
        />
      </S.SearchBarWrapper>
      <Grid>
        {devices.isLoading ? (
          <p>Carregando</p>
        ) : (
          filteredDevices.map(({ name, _id, photoUrl }) => (
            <S.Li key={_id}>
              <S.ImgWrapper>
                <img src={photoUrl} alt={name} />
              </S.ImgWrapper>
              {name}{" "}
              <Button
                variant="regular"
                onClick={() => {
                  setSelectedDevice(name);
                  setIsOpen(true);
                  setValue("deviceId", _id);
                }}
              >
                Adicionar
              </Button>
            </S.Li>
          ))
        )}
      </Grid>
      <Toaster />

      <Dialog open={open} onOpenChange={setIsOpen}>
        <DialogContent>
          <S.ContentWrapper>
            <DialogTitle>{selectedDevice}</DialogTitle>
            <S.Form
              onSubmit={handleSubmit((data) => {
                toast.loading("Adicionando device");
                setTimeout(
                  () => addUserDevice.mutate({ data, setIsOpen, reset, toast }),
                  getDelay() * 1000,
                );
              })}
            >
              <input {...register("userId")} style={{ display: "none" }} />
              <input {...register("deviceId")} style={{ display: "none" }} />
              <InputWrapper>
                <label htmlFor="room">Quarto</label>
                <input
                  type="text"
                  name="room"
                  id="room"
                  {...register("room")}
                />
              </InputWrapper>

              <InputWrapper>
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
              </InputWrapper>

              <S.ButtonsWrapper>
                <DialogClose asChild>
                  <Button variant="underlined">Cancelar</Button>
                </DialogClose>
                <Button variant="regular">Submeter</Button>
              </S.ButtonsWrapper>
            </S.Form>
          </S.ContentWrapper>
        </DialogContent>
      </Dialog>
    </Container>
  );
};
