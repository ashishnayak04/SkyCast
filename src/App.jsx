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
    <div className={`min-h-screen transition-all duration-700 ${darkMode ? "bg-slate-950 text-slate-100" : `bg-gradient-to-br ${bg} text-slate-900`
      }`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Main Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Column (3/12) */}
          <div className="lg:col-span-3 space-y-6 min-w-0">
            <div className="flex items-center justify-between lg:flex-col lg:items-start lg:gap-4">
              <div>
                <h1 className={`text-3xl font-bold tracking-tight ${darkMode ? "text-white" : "text-white drop-shadow-md"}`}>SkyCast</h1>
                <p className={`text-sm mt-1 ${darkMode ? "text-slate-400" : "text-white/80 font-medium drop-shadow-sm"}`}>Real-time weather for any city</p>
              </div>
              <button onClick={() => setDarkMode(d => !d)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all shadow-sm hover:scale-105 active:scale-95 ${darkMode
                    ? "bg-slate-800/50 hover:bg-slate-800 border-slate-700 text-slate-200"
                    : "bg-white/20 hover:bg-white/30 backdrop-blur-md border-white/40 text-white shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
                  }`}>
                {darkMode ? "☀️ Light" : "🌙 Dark"}
              </button>
            </div>

            <SearchBar onSearch={fetchWeather} onLocate={handleLocate} />

            {weather && !loading && (
              <WeatherCard weather={weather} unit={unit} />
            )}

            {loading && (
              <div className="text-center py-12">
                <div className="text-5xl animate-bounce drop-shadow-lg">🌍</div>
                <p className={`mt-4 text-sm font-medium ${darkMode ? "text-slate-400" : "text-white drop-shadow-md"}`}>Fetching weather...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-500/20 border border-red-400/40 rounded-2xl p-4 text-white text-sm text-center">
                {error}
              </div>
            )}
          </div>

          {/* Right Column (9/12) */}
          <div className="lg:col-span-9 space-y-6 min-w-0">
            {/* Top Bar with Favourites and Controls */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="w-full lg:w-auto lg:flex-1 min-w-[240px] overflow-x-auto pb-2 lg:pb-0">
                <FavouritesBar
                  favourites={favourites}
                  onSelect={fetchWeather}
                  onRemove={removeFavourite}
                  currentCity={currentCity}
                />
              </div>
              {weather && (
                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <button
                    onClick={() => isFavourite(currentCity) ? removeFavourite(currentCity) : addFavourite(currentCity)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all shadow-sm hover:scale-105 active:scale-95 whitespace-nowrap
                      ${isFavourite(currentCity)
                        ? (darkMode ? "bg-blue-500/20 border-blue-500/50 text-blue-400" : "bg-white/40 backdrop-blur-md border-white/60 text-white shadow-[0_4px_30px_rgba(0,0,0,0.1)]")
                        : (darkMode ? "bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-800" : "bg-white/20 backdrop-blur-md border-white/40 text-white hover:bg-white/30 shadow-[0_4px_30px_rgba(0,0,0,0.1)]")}`}>
                    {isFavourite(currentCity) ? "📌 Pinned" : "📍 Pin city"}
                  </button>
                  <button onClick={() => setUnit(u => u === "C" ? "F" : "C")}
                    className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all shadow-sm hover:scale-105 active:scale-95 whitespace-nowrap ${darkMode ? "bg-slate-800/50 hover:bg-slate-800 border-slate-700 text-slate-300" : "bg-white/20 hover:bg-white/30 backdrop-blur-md border-white/40 text-white shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
                      }`}>
                    Switch to °{unit === "C" ? "F" : "C"}
                  </button>
                </div>
              )}
            </div>

            {/* Dashboard Content */}
            {weather && !loading && (
              <div className="space-y-6">
                {/* Secondary Cards Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {aqi && <AqiCard aqi={aqi} />}
                  <SunCard weather={weather} />
                </div>

                {/* Charts and Forecast */}
                {forecast && (
                  <div className="space-y-6">
                    <TempChart forecast={forecast} unit={unit} />
                    <ForecastRow forecast={forecast} unit={unit} />
                  </div>
                )}
              </div>
            )}

            {!weather && !loading && !error && (
              <div className="text-center py-32 h-full flex flex-col items-center justify-center border-2 border-dashed border-white/20 rounded-3xl">
                <div className="text-7xl mb-6 drop-shadow-lg animate-pulse">🌤️</div>
                <p className={`text-lg font-medium ${darkMode ? "text-slate-400" : "text-white/90 drop-shadow-md"}`}>Search for a city to get started</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}