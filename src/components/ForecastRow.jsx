import { getWeatherEmoji, celsiusToFahrenheit, formatDay } from "../utils/weatherUtils";
import { groupForecastByDay } from "../utils/weatherUtils";

const ForecastRow = ({ forecast, unit }) => {
  const days = groupForecastByDay(forecast.list);

  return (
    <div className="grid grid-cols-5 gap-3">
      {days.map((day) => {
        const min = unit === "C" ? day.min : celsiusToFahrenheit(day.min);
        const max = unit === "C" ? day.max : celsiusToFahrenheit(day.max);
        return (
          <div key={day.date} className="bg-white/15 backdrop-blur border border-white/25 rounded-2xl p-3 text-white text-center">
            <p className="text-xs text-white/70">{formatDay(day.date)}</p>
            <div className="text-3xl my-2">{getWeatherEmoji(day.condition)}</div>
            <p className="text-xs capitalize text-white/60">{day.description}</p>
            <p className="text-sm font-medium mt-2">{max}°</p>
            <p className="text-xs text-white/60">{min}°</p>
          </div>
        );
      })}
    </div>
  );
};

export default ForecastRow;
