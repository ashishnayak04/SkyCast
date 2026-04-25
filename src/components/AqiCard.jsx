const AQI_LEVELS = [
  { label: "Good", color: "bg-green-400/30 border-green-400/50 text-green-200", bar: "bg-green-400", desc: "Air quality is excellent. Enjoy outdoor activities!" },
  { label: "Fair", color: "bg-yellow-400/30 border-yellow-400/50 text-yellow-200", bar: "bg-yellow-400", desc: "Air quality is acceptable. Sensitive groups should take care." },
  { label: "Moderate", color: "bg-orange-400/30 border-orange-400/50 text-orange-200", bar: "bg-orange-400", desc: "Sensitive individuals may experience effects." },
  { label: "Poor", color: "bg-red-400/30 border-red-400/50 text-red-200", bar: "bg-red-400", desc: "Everyone may begin to experience health effects." },
  { label: "Very Poor", color: "bg-purple-400/30 border-purple-400/50 text-purple-200", bar: "bg-purple-500", desc: "Health warnings. Avoid outdoor activities." },
];

const AqiCard = ({ aqi }) => {
  const index = aqi.main.aqi - 1;
  const level = AQI_LEVELS[index];
  const { pm2_5, pm10, no2, o3 } = aqi.components;
  const barWidth = `${(aqi.main.aqi / 5) * 100}%`;

  return (
    <div className={`backdrop-blur border rounded-2xl p-5 text-white ${level.color}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-white/70">Air Quality Index</h3>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${level.color}`}>
          {level.label}
        </span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-2 mb-4">
        <div className={`h-2 rounded-full transition-all duration-700 ${level.bar}`} style={{ width: barWidth }} />
      </div>

      <p className="text-white/60 text-xs mb-4">{level.desc}</p>
      <div className="grid grid-cols-4 gap-2 text-center">
        {[["PM2.5", pm2_5], ["PM10", pm10], ["NO₂", no2], ["O₃", o3]].map(([name, val]) => (
          <div key={name} className="bg-white/10 rounded-xl p-2">
            <p className="text-white/50 text-xs">{name}</p>
            <p className="text-sm font-medium mt-1">{Math.round(val)}</p>
            <p className="text-white/40 text-xs">μg/m³</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AqiCard;
