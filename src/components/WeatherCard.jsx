import { celsiusToFahrenheit, getWeatherEmoji } from "../utils/weatherUtils";

const WeatherCard = ({ weather, unit }) => {
  const temp = unit === "C" ? Math.round(weather.main.temp) : celsiusToFahrenheit(weather.main.temp);
  const feels = unit === "C" ? Math.round(weather.main.feels_like) : celsiusToFahrenheit(weather.main.feels_like);
  const emoji = getWeatherEmoji(weather.weather[0].main);

  return (
    <div className="bg-white/20 dark:bg-slate-800/40 backdrop-blur-xl border border-white/40 dark:border-slate-600 rounded-3xl p-8 text-white dark:text-slate-100 shadow-[0_8px_32px_rgba(0,0,0,0.15)] transition-all hover:shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="break-words w-full">
          <h2 className="text-3xl font-bold tracking-tight drop-shadow-sm leading-tight">{weather.name}, {weather.sys.country}</h2>
          <p className="text-white/80 dark:text-slate-400 text-sm mt-1.5 capitalize font-medium">{weather.weather[0].description}</p>
        </div>
        <span className="text-6xl drop-shadow-md hover:scale-110 transition-transform cursor-default flex-shrink-0">{emoji}</span>
      </div>
      <div className="mt-4">
        <span className="text-8xl font-bold tracking-tighter drop-shadow-lg">{temp}°<span className="text-5xl font-medium text-white/80 dark:text-slate-400 ml-1">{unit}</span></span>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-8 text-sm">
        <Stat label="Feels like" value={`${feels}°${unit}`} />
        <Stat label="Humidity" value={`${weather.main.humidity}%`} />
        <Stat label="Wind" value={`${Math.round(weather.wind.speed)} m/s`} />
      </div>
    </div>
  );
};

const Stat = ({ label, value }) => (
  <div className="bg-white/20 dark:bg-slate-700/50 rounded-2xl p-4 text-center border border-white/20 dark:border-slate-600 shadow-sm hover:-translate-y-1 transition-transform">
    <p className="text-white/70 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">{label}</p>
    <p className="font-semibold text-lg mt-1 text-white dark:text-slate-200">{value}</p>
  </div>
);

export default WeatherCard;
