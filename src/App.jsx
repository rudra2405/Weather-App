import { Oval } from "react-loader-spinner";
import React, { useState } from "react";
import axios from "axios";
import { FaFrown } from "react-icons/fa";
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
} from "react-icons/wi";

function WeatherApp() {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });

  const toDateFunction = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const WeekDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDate = new Date();
    return `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${
      months[currentDate.getMonth()]
    }`;
  };

  const search = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setInput("");
      setWeather({ ...weather, loading: true });
      const url = "https://api.openweathermap.org/data/2.5/weather";
      const api_key = "f00c38e0279b7bc85480c3fe775d518c";
      await axios
        .get(url, {
          params: { q: input, units: "metric", appid: api_key },
        })
        .then((res) => {
          setWeather({ data: res.data, loading: false, error: false });
        })
        .catch(() => {
          setWeather({ ...weather, data: {}, error: true });
          setInput("");
        });
    }
  };

  const WeatherIcon = ({ main }) => {
    switch (main.toLowerCase()) {
      case "clear":
        return <WiDaySunny size={80} className="text-yellow-500" />;
      case "clouds":
        return <WiCloud size={80} className="text-gray-500" />;
      case "rain":
      case "drizzle":
        return <WiRain size={80} className="text-blue-500" />;
      case "snow":
        return <WiSnow size={80} className="text-white" />;
      case "thunderstorm":
        return <WiThunderstorm size={80} className="text-purple-500" />;
      case "mist":
      case "fog":
      case "haze":
        return <WiFog size={80} className="text-gray-400" />;
      default:
        return <WiDaySunny size={80} className="text-yellow-500" />;
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start p-6 bg-center bg-cover"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg?cs=srgb&dl=pexels-pixabay-209831.jpg&fm=jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-4xl font-bold mt-6 text-yellow-800">Weather App</h1>
      {/* Search Input */}
      <div className="w-full max-w-md mt-6">
        <input
          type="text"
          className="w-full text-white p-3 rounded-lg outline-none shadow-md focus:ring-2 focus:ring-yellow-400"
          placeholder="Enter City Name..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={search}
        />
      </div>
      {/* Loader */}
      {weather.loading && (
        <div className="mt-10">
          <Oval color="gray" height={80} width={80} />
        </div>
      )}
      {/* Error */}
      {weather.error && (
        <div className="mt-10 flex items-center gap-2 bg-red-500/80 text-white px-4 py-2 rounded-lg shadow-lg">
          <FaFrown size={24} />
          <span className="text-lg">City not found</span>
        </div>
      )}
      {/* Weather Data */}
      {weather?.data?.main && (
        <div className="mt-10 bg-white rounded-2xl shadow-xl p-6 w-full max-w-md text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            {weather.data.name}, {weather.data.sys.country}
          </h2>
          <p className="text-sm text-gray-600 mb-4">{toDateFunction()}</p>

          <div className="flex flex-col items-center">
            {/* Weather Icon */}
            <WeatherIcon main={weather.data.weather[0].main} />

            <p className="text-5xl font-bold mt-2 text-gray-800">
              {Math.round(weather.data.main.temp)}°C
            </p>
          </div>

          <div className="mt-4 space-y-1">
            <p className="uppercase font-medium text-gray-700">
              {weather.data.weather[0].description}
            </p>
            <p className="text-sm text-gray-600">
              💨 Wind: {weather.data.wind.speed} m/s
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
