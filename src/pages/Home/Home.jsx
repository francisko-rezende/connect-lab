/* eslint-disable camelcase */
import { getRegisteredDevices, getUser } from "@api";
import {
  Button,
  Container,
  Grid,
  WeatherWidget,
  DeviceCard,
  DeviceDetailsDialog,
} from "@components";
import * as S from "./Home.styles";
import {
  useUserDevices,
  useRemoveUserDevice,
  useToggleDeviceStatus,
  useGlobalContext,
  useCheckToken,
  useWeatherData,
  useUser,
  useLocationOptions,
} from "@hooks";
import { queryClient } from "@lib/react-query";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export const Home = () => {
  const { userId } = useGlobalContext();
  const locations = useLocationOptions();

  const userQuery = useUser(userId);
  queryClient.setQueryDefaults(["weather", userQuery.data?.address?.city], {
    enabled: !!userQuery.data?.address?.city,
  });
  const userDevicesQuery = useUserDevices(userId);
  const removeDevice = useRemoveUserDevice();
  const toggleDeviceStatus = useToggleDeviceStatus();

  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const [locationToShow, setLocationToShow] = useState(null);
  const weatherQuery = useWeatherData(userQuery.data?.address?.city);

  useCheckToken();

  useEffect(() => {
    queryClient.prefetchQuery("registeredDevices", getRegisteredDevices);
    queryClient.prefetchQuery("user", getUser);
  }, [userId]);

  const [selectedDeviceId, setSelectedDeviceId] = useState(null);

  const filteredDevices = locationToShow
    ? userDevicesQuery.data.filter(
        ({ local: { description } }) => description === locationToShow,
      )
    : userDevicesQuery.data;

  const selectedDevice = queryClient.getQueryData([
    "userDevices",
    selectedDeviceId,
  ]);

  const handleCardClick = (item) => {
    setSelectedDeviceId(item._id);
    setIsDialogOpen(true);
  };

  const handleToggleDeviceStatus = (item) => {
    toggleDeviceStatus.mutate({
      deviceId: item._id,
      deviceStatus: item.is_on,
    });
  };

  const handleRemoveDevice = () =>
    toast.promise(
      removeDevice.mutateAsync({
        id: selectedDevice._id,
        setIsDialogOpen,
      }),
      {
        loading: "Removendo...",
        success: <b>Remoção bem sucedida!</b>,
        error: <b>Não foi possível remover device.</b>,
      },
    );

  console.log(selectedDevice);

  return (
    <Container>
      <Toaster />
      {!weatherQuery.isLoading & !userQuery.isLoading & !!weatherQuery.data ? (
        <WeatherWidget weatherQuery={weatherQuery} userQuery={userQuery} />
      ) : (
        <p>Loading...</p>
      )}
      <S.FilterButtonsWrapper>
        {!locations.isLoading &&
          locations.data.map(({ description, locationId }) => {
            return (
              <Button
                variant="regular"
                key={locationId}
                onClick={() => setLocationToShow(description)}
              >
                {description}
              </Button>
            );
          })}
        <Button variant="regular" onClick={() => setLocationToShow(null)}>
          Todos
        </Button>
      </S.FilterButtonsWrapper>
      <Grid>
        {userDevicesQuery.isLoading ? (
          <p>Loading...</p>
        ) : (
          filteredDevices.map((item) => {
            return (
              <DeviceCard
                key={item._id}
                handleCardClick={() => handleCardClick(item)}
                handleToggleDeviceStatus={(e) => {
                  e.stopPropagation();
                  handleToggleDeviceStatus(item);
                }}
                item={item}
              />
            );
          })
        )}
      </Grid>
      {selectedDevice && (
        <DeviceDetailsDialog
          handleRemoveDevice={handleRemoveDevice}
          isDialogOpen={isDialogOpen}
          selectedDevice={selectedDevice}
          setIsDialogOpen={setIsDialogOpen}
          handleToggleDeviceStatus={() =>
            handleToggleDeviceStatus(selectedDevice)
          }
        />
      )}
    </Container>
  );
};
