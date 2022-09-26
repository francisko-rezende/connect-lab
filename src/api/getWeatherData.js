import { OPENWEATHER_KEY } from "@config";
import axios from "axios";

// todo create instance for these axios calls

export const getWeatherData = async (cityName) => {
  const cityCoordinatesRes = await axios.get(
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${OPENWEATHER_KEY}`,
  );

  const { lat, lon } = cityCoordinatesRes.data[0];

  const { data } = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=pt_br&units=metric&appid=${OPENWEATHER_KEY}`,
  );

  return data;
};
