import React, { useState } from "react";
import styles from "./Weather.module.css";

const API_KEY = "cf8a1cc5edce482dbeb174646250512";

interface Weather {
  temp_c: string;
  humidity: string;
  condition: string;
  wind_kph: string;
}
const Weather: React.FC = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city.trim()) {
      alert("Please enter a city name");
      return;
    }

    try {
      setLoading(true);
      setWeather(null);

      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`);

      if (!response.ok) {
        alert("City not found. Please enter a valid city.");
        setLoading(false);
        return;
      }

      const data = await response.json();
      setWeather({
        temp_c: data.current.temp_c,
        humidity: data.current.humidity,
        condition: data.current.condition.text,
        wind_kph: data.current.wind_kph,
      });
    } catch (error) {
      console.log(error);
      alert("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchBox}>
        <input
          className={styles.input}
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className={styles.button} onClick={fetchWeather}>
          Search
        </button>
      </div>

      {loading && <p className={styles.loading}>Loading data...</p>}

      {!loading && weather && (
        <div className={`${styles.cards} "weather-cards"`}>
          <div className={`${styles.card} "weather-card"`}>
            <h3>Temperature</h3>
            <p>{weather.temp_c}°C</p>
          </div>

          <div className={`${styles.card} "weather-card"`}>
            <h3>Humidity</h3>
            <p>{weather.humidity}%</p>
          </div>

          <div className={`${styles.card} "weather-card"`}>
            <h3>Condition</h3>
            <p>{weather.condition}</p>
          </div>

          <div className={`${styles.card} "weather-card"`}>
            <h3>Wind Speed</h3>
            <p>{weather.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
