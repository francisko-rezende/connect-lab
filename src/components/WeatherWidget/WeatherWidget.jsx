/* eslint-disable camelcase */
import PropTypes from "prop-types";
import * as S from "./WeatherWidget.styles";

export const WeatherWidget = ({ weatherQuery, userQuery }) => {
  const {
    data: {
      main: { temp, feels_like },
      weather: [weather],
    },
  } = weatherQuery;

  const {
    data: {
      address: { city, state },
    },
  } = userQuery;

  return (
    <S.WeatherWrapper>
      <S.Temperature>{Math.round(temp)} ºC</S.Temperature>
      <p style={{ textTransform: "capitalize" }}>{weather.description}</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
        alt={`tempo ${weather.description}`}
      />
      <p>
        {city}, {state}
      </p>
      <p>Sensação térmica: {Math.round(feels_like)}ºC </p>
    </S.WeatherWrapper>
  );
};

WeatherWidget.propTypes = {
  weatherQuery: PropTypes.object,
  userQuery: PropTypes.object,
};
