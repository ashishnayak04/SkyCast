import { useState } from "react";
import { useWeather } from "./hooks/useWeather";
import { getWeatherBackground } from "./utils/weatherUtils";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastRow from "./components/ForecastRow";
import TempChart from "./components/TempChart";

export default function App() {
  const { weather, forecast, loading, error, fetchWeather, fetchByCoords } = useWeather();
  const [unit, setUnit] = useState("C");

  const handleLocate = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported");
    navigator.geolocation.getCurrentPosition(
      (pos) => fetchByCoords(pos.coords.latitude, pos.coords.longitude),
      () => alert("Could not get your location")
    );
  };

  const bg = getWeatherBackground(weather?.weather?.[0]?.main);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bg} transition-all duration-700`}>
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">

        <div className="text-center">
          <h1 className="text-3xl font-semibold text-white">SkyCast </h1>
          <p className="text-white/60 text-sm mt-1">Real-time weather for any city</p>
        </div>

        <SearchBar onSearch={fetchWeather} onLocate={handleLocate} />

        {weather && (
          <div className="flex justify-end">
            <button onClick={() => setUnit(u => u === "C" ? "F" : "C")}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl border border-white/30 text-sm font-medium transition-all">
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
