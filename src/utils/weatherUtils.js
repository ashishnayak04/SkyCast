export const getWeatherBackground =(condition)=>{
    if(!condition) return "from-blue-400 to blue-600";
    const c = condition.toLowerCase();
    if (c.includes("clear")) return ("from-amber-300 to-orange-400");
    if (c.includes("cloud")) return "from-gray-400 to-gray-600";
    if (c.includes("rain") || c.includes("drizzle")) return "from-blue-600 to-indigo-800";
    if (c.includes("thunder")) return "from-gray-700 to-gray-900";
    if (c.includes("snow")) return "from-blue-100 to-blue-300";
    if (c.includes("mist") || c.includes("fog")) return "from-gray-300 to-gray-500";
    return "from-blue-400 to-blue-600";
};
export const getWeatherEmoji = (condition) => {
  if (!condition) return "🌤️";
  const c = condition.toLowerCase();
  if (c.includes("clear")) return "☀️";
  if (c.includes("cloud")) return "☁️";
  if (c.includes("rain")) return "🌧️";
  if (c.includes("drizzle")) return "🌦️";
  if (c.includes("thunder")) return "⛈️";
  if (c.includes("snow")) return "❄️";
  if (c.includes("mist") || c.includes("fog")) return "🌫️";
  return "🌤️";
};
export const celsiusToFahrenheit = (c) => Math.round((c * 9) / 5 + 32);

export const formatDay = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
};

export const formatHour = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
};

export const groupForecastByDay = (list) => {
  const days = {};
  list.forEach((item) => {
    const day = item.dt_txt.split(" ")[0];
    if (!days[day]) days[day] = [];
    days[day].push(item);
  });
  return Object.entries(days).slice(0, 5).map(([date, items]) => ({
    date,
    min: Math.round(Math.min(...items.map((i) => i.main.temp_min))),
    max: Math.round(Math.max(...items.map((i) => i.main.temp_max))),
    condition: items[Math.floor(items.length / 2)].weather[0].main,
    description: items[Math.floor(items.length / 2)].weather[0].description,
  }));
};
