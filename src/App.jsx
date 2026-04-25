import { useState, useEffect } from "react";
import { useWeather } from "./hooks/useWeather";
import { useFavourites } from "./hooks/useFavourites";
import { getWeatherBackground } from "./utils/weatherUtils";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastRow from "./components/ForecastRow";
import TempChart from "./components/TempChart";
import AqiCard from "./components/AqiCard";
import FavouritesBar from "./components/FavouritesBar";
import SunCard from "./components/SunCard";

export default function App() {
  const { weather, forecast, aqi, loading, error, fetchWeather, fetchByCoords } = useWeather();
  const { favourites, addFavourite, removeFavourite, isFavourite } = useFavourites();
  const [unit, setUnit] = useState("C");
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleLocate = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported");
    navigator.geolocation.getCurrentPosition(
      (pos) => fetchByCoords(pos.coords.latitude, pos.coords.longitude),
      () => alert("Could not get your location")
    );
  };

  const bg = getWeatherBackground(weather?.weather?.[0]?.main);
  const currentCity = weather?.name;

  return (
    <div className={`min-h-screen transition-all duration-700 ${
      darkMode ? "bg-gray-900" : `bg-gradient-to-br ${bg}`
    }`}>
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white">Weather Dashboard</h1>
            <p className="text-white/60 text-xs mt-0.5">Real-time weather for any city</p>
          </div>
          <button onClick={() => setDarkMode(d => !d)}
            className="flex items-center gap-2 px-4 py-2 bg-white/15 hover:bg-white/25 text-white rounded-xl border border-white/25 text-sm transition-all">
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        <SearchBar onSearch={fetchWeather} onLocate={handleLocate} />

        <FavouritesBar
          favourites={favourites}
          onSelect={fetchWeather}
          onRemove={removeFavourite}
          currentCity={currentCity}
        />

        {weather && (
          <div className="flex items-center justify-between">
            <button
              onClick={() => isFavourite(currentCity) ? removeFavourite(currentCity) : addFavourite(currentCity)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm transition-all
                ${isFavourite(currentCity)
                  ? "bg-white/30 border-white/50 text-white"
                  : "bg-white/10 border-white/25 text-white/80 hover:bg-white/20"}`}>
              {isFavourite(currentCity) ? "📌 Pinned" : "📍 Pin city"}
            </button>
            <button onClick={() => setUnit(u => u === "C" ? "F" : "C")}
              className="px-4 py-2 bg-white/15 hover:bg-white/25 text-white rounded-xl border border-white/25 text-sm font-medium transition-all">
              Switch to °{unit === "C" ? "F" : "C"}
            </button>
          </div>
        )}

        {loading && (
          <div className="text-center py-12">
            <div className="text-5xl animate-bounce">🌍</div>
            <p className="text-white/70 mt-3 text-sm">Fetching weather...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-500/20 border border-red-400/40 rounded-2xl p-4 text-white text-sm text-center">
            {error}
          </div>
        )}

        {weather && !loading && (
          <>
            <WeatherCard weather={weather} unit={unit} />
            {aqi && <AqiCard aqi={aqi} />}
            <SunCard weather={weather} />
            {forecast && (
              <>
                <TempChart forecast={forecast} unit={unit} />
                <ForecastRow forecast={forecast} unit={unit} />
              </>
            )}
          </>
        )}

        {!weather && !loading && !error && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🌤️</div>
            <p className="text-white/60 text-sm">Search for a city to get started</p>
          </div>
        )}

      </div>
    </div>
  );
}