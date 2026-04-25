import { celsiusToFahrenheit, getWeatherEmoji } from "../utils/weatherUtils";

const WeatherCard = ({ weather, unit }) => {
  const temp = unit === "C" ? Math.round(weather.main.temp) : celsiusToFahrenheit(weather.main.temp);
  const feels = unit === "C" ? Math.round(weather.main.feels_like) : celsiusToFahrenheit(weather.main.feels_like);
  const emoji = getWeatherEmoji(weather.weather[0].main);

  return (
    <div className="bg-white/15 backdrop-blur border border-white/25 rounded-2xl p-6 text-white">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-semibold">{weather.name}, {weather.sys.country}</h2>
          <p className="text-white/70 text-sm mt-1 capitalize">{weather.weather[0].description}</p>
        </div>
        <span className="text-5xl">{emoji}</span>
      </div>
      <div className="mt-4">
        <span className="text-7xl font-light">{temp}°{unit}</span>
      </div>
      <div className="grid grid-cols-3 gap-3 mt-6 text-sm">
        <Stat label="Feels like" value={`${feels}°${unit}`} />
        <Stat label="Humidity" value={`${weather.main.humidity}%`} />
        <Stat label="Wind" value={`${Math.round(weather.wind.speed)} m/s`} />
      </div>
    </div>
  );
};

const Stat = ({ label, value }) => (
  <div className="bg-white/10 rounded-xl p-3 text-center">
    <p className="text-white/60 text-xs">{label}</p>
    <p className="font-medium mt-1">{value}</p>
  </div>
);

export default WeatherCard;
