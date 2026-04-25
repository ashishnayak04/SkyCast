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
          <div key={day.date} className="bg-white/20 dark:bg-slate-800/40 backdrop-blur-xl border border-white/40 dark:border-slate-600 rounded-3xl p-4 text-white dark:text-slate-100 text-center shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-all hover:scale-105 hover:-translate-y-1 cursor-default">
            <p className="text-sm font-semibold text-white/90 dark:text-slate-300">{formatDay(day.date)}</p>
            <div className="text-4xl my-3 drop-shadow-md">{getWeatherEmoji(day.condition)}</div>
            <p className="text-xs font-medium capitalize text-white/70 dark:text-slate-400 truncate">{day.description}</p>
            <p className="text-lg font-bold mt-3 text-white dark:text-slate-200">{max}°</p>
            <p className="text-sm text-white/60 dark:text-slate-500">{min}°</p>
          </div>
        );
      })}
    </div>
  );
};

export default ForecastRow;
