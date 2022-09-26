import { getWeatherData } from "@api";
import { useQuery } from "react-query";

export const useWeatherData = (cityName) => {
  const weatherDataQuery = useQuery(
    ["weather", cityName],
    () => getWeatherData(cityName),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchInterval: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 15,
    },
  );

  return weatherDataQuery;
};
