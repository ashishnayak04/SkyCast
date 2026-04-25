import { useState, useCallback } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE = "https://api.openweathermap.org/data/2.5";
const AIR_BASE = "https://api.openweathermap.org/data/2.5/air_pollution";

export const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [aqi, setAqi] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAqi = async (lat, lon) => {
    try {
      const res = await axios.get(`${AIR_BASE}?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
      setAqi(res.data.list[0]);
    } catch {
      setAqi(null);
    }
  };

  const fetchWeather = useCallback(async (city) => {
    if (!city.trim()) return;
    setLoading(true);
    setError("");
    try {
      const [w, f] = await Promise.all([
        axios.get(`${BASE}/weather?q=${city}&appid=${API_KEY}&units=metric`),
        axios.get(`${BASE}/forecast?q=${city}&appid=${API_KEY}&units=metric`),
      ]);
      setWeather(w.data);
      setForecast(f.data);
      await fetchAqi(w.data.coord.lat, w.data.coord.lon);
      const recent = JSON.parse(localStorage.getItem("recentCities") || "[]");
      const updated = [city, ...recent.filter((c) => c !== city)].slice(0, 5);
      localStorage.setItem("recentCities", JSON.stringify(updated));
    } catch (err) {
      setError(err.response?.status === 404 ? "City not found. Please check the name and try again." : "Something went wrong. Please try again.");
      setWeather(null); setForecast(null); setAqi(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchByCoords = useCallback(async (lat, lon) => {
    setLoading(true);
    setError("");
    try {
      const [w, f] = await Promise.all([
        axios.get(`${BASE}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`),
        axios.get(`${BASE}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`),
      ]);
      setWeather(w.data);
      setForecast(f.data);
      await fetchAqi(lat, lon);
    } catch {
      setError("Could not fetch weather for your location.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { weather, forecast, aqi, loading, error, fetchWeather, fetchByCoords };
};
