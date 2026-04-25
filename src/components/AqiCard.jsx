const AQI_LEVELS = [
  { label: "Good", color: "bg-green-500/30 border-green-400/50 text-green-100 dark:text-green-300", bar: "bg-green-400", desc: "Air quality is excellent. Enjoy outdoor activities!" },
  { label: "Fair", color: "bg-yellow-500/30 border-yellow-400/50 text-yellow-100 dark:text-yellow-300", bar: "bg-yellow-400", desc: "Air quality is acceptable. Sensitive groups should take care." },
  { label: "Moderate", color: "bg-orange-500/30 border-orange-400/50 text-orange-100 dark:text-orange-300", bar: "bg-orange-400", desc: "Sensitive individuals may experience effects." },
  { label: "Poor", color: "bg-red-500/30 border-red-400/50 text-red-100 dark:text-red-300", bar: "bg-red-400", desc: "Everyone may begin to experience health effects." },
  { label: "Very Poor", color: "bg-purple-500/30 border-purple-400/50 text-purple-100 dark:text-purple-300", bar: "bg-purple-500", desc: "Health warnings. Avoid outdoor activities." },
];

const AqiCard = ({ aqi }) => {
  const index = aqi.main.aqi - 1;
  const level = AQI_LEVELS[index];
  const { pm2_5, pm10, no2, o3 } = aqi.components;
  const barWidth = `${(aqi.main.aqi / 5) * 100}%`;

  return (
    <div className="bg-white/20 dark:bg-slate-800/40 backdrop-blur-xl border border-white/40 dark:border-slate-600 rounded-3xl p-6 text-white dark:text-slate-100 shadow-[0_8px_32px_rgba(0,0,0,0.15)] transition-all hover:shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold tracking-wide text-white/80 dark:text-slate-400 uppercase">Air Quality Index</h3>
        <span className={`text-xs font-bold px-4 py-1.5 rounded-full border shadow-sm ${level.color}`}>
          {level.label}
        </span>
      </div>
      <div className="w-full bg-black/10 dark:bg-slate-900/50 rounded-full h-2.5 mb-4 shadow-inner">
        <div className={`h-2.5 rounded-full transition-all duration-1000 ease-out shadow-sm ${level.bar}`} style={{ width: barWidth }} />
      </div>

      <p className="text-white/80 dark:text-slate-300 text-sm mb-5 font-medium">{level.desc}</p>
      <div className="grid grid-cols-4 gap-3 text-center">
        {[["PM2.5", pm2_5], ["PM10", pm10], ["NO₂", no2], ["O₃", o3]].map(([name, val]) => (
          <div key={name} className="bg-white/20 dark:bg-slate-700/50 rounded-2xl p-3 border border-white/10 dark:border-slate-600 hover:-translate-y-1 transition-transform shadow-sm">
            <p className="text-white/70 dark:text-slate-400 text-xs font-medium">{name}</p>
            <p className="text-base font-bold mt-1 text-white dark:text-slate-200">{Math.round(val)}</p>
            <p className="text-white/50 dark:text-slate-500 text-[10px] mt-0.5">μg/m³</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AqiCard;
