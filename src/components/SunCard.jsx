const formatTime = (unixTimestamp, timezoneOffset) => {
  const utcMs = unixTimestamp * 1000;
  const localMs = utcMs + timezoneOffset * 1000;
  const date = new Date(localMs);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const h12 = hours % 12 || 12;
  return `${h12}:${minutes} ${ampm}`;
};

const getDaylightDuration = (sunrise, sunset) => {
  const diff = (sunset - sunrise) * 1000;
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  return `${h}h ${m}m`;
};

const getSunProgress = (sunrise, sunset) => {
  const now = Math.floor(Date.now() / 1000);
  if (now <= sunrise) return 0;
  if (now >= sunset) return 100;
  return Math.round(((now - sunrise) / (sunset - sunrise)) * 100);
};

const SunCard = ({ weather }) => {
  const { sunrise, sunset } = weather.sys;
  const tz = weather.timezone;
  const progress = getSunProgress(sunrise, sunset);
  const isDay = progress > 0 && progress < 100;

  const r = 70;
  const cx = 160;
  const cy = 90;
  const progressAngle = Math.PI - (progress / 100) * Math.PI;
  const sunX = cx + r * Math.cos(progressAngle);
  const sunY = cy - r * Math.sin(progressAngle);

  return (
    <div className="bg-white/20 dark:bg-slate-800/40 backdrop-blur-xl border border-white/40 dark:border-slate-600 rounded-3xl p-6 text-white dark:text-slate-100 shadow-[0_8px_32px_rgba(0,0,0,0.15)] transition-all hover:shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
      <h3 className="text-sm font-semibold tracking-wide text-white/80 dark:text-slate-400 uppercase mb-6">Sunrise & Sunset</h3>

      <div className="flex justify-center mb-4">
        <svg width="320" height="110" viewBox="0 0 320 110">
          <line x1="60" y1="90" x2="260" y2="90" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <path
            d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {progress > 0 && (
            <path
              d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${sunX} ${sunY}`}
              fill="none"
              stroke="rgba(255,220,100,0.8)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          )}
          {isDay && (
            <>
              <circle cx={sunX} cy={sunY} r="10" fill="rgba(255,220,80,0.25)" />
              <circle cx={sunX} cy={sunY} r="6" fill="rgba(255,215,60,0.95)" />
            </>
          )}
          <circle cx={cx - r} cy={cy} r="4" fill="rgba(255,200,60,0.7)" />
          <circle cx={cx + r} cy={cy} r="4" fill="rgba(255,120,60,0.7)" />
          <text x={cx - r} y={cy + 18} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10">Sunrise</text>
          <text x={cx + r} y={cy + 18} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10">Sunset</text>
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="bg-white/20 dark:bg-slate-700/50 rounded-2xl p-3 border border-white/10 dark:border-slate-600 shadow-sm hover:-translate-y-1 transition-transform">
          <p className="text-xs text-white/70 dark:text-slate-400 mb-1 font-medium">🌅 Sunrise</p>
          <p className="text-base font-bold text-white dark:text-slate-200">{formatTime(sunrise, tz)}</p>
        </div>
        <div className="bg-white/20 dark:bg-slate-700/50 rounded-2xl p-3 border border-white/10 dark:border-slate-600 shadow-sm hover:-translate-y-1 transition-transform">
          <p className="text-xs text-white/70 dark:text-slate-400 mb-1 font-medium">☀️ Daylight</p>
          <p className="text-base font-bold text-white dark:text-slate-200">{getDaylightDuration(sunrise, sunset)}</p>
        </div>
        <div className="bg-white/20 dark:bg-slate-700/50 rounded-2xl p-3 border border-white/10 dark:border-slate-600 shadow-sm hover:-translate-y-1 transition-transform">
          <p className="text-xs text-white/70 dark:text-slate-400 mb-1 font-medium">🌇 Sunset</p>
          <p className="text-base font-bold text-white dark:text-slate-200">{formatTime(sunset, tz)}</p>
        </div>
      </div>

      <div className="mt-5">
        <div className="flex justify-between text-xs text-white/70 dark:text-slate-400 mb-1.5 font-medium">
          <span>Day progress</span>
          <span>{progress < 100 && progress > 0 ? `${progress}%` : progress === 0 ? "Before sunrise" : "After sunset"}</span>
        </div>
        <div className="w-full bg-black/10 dark:bg-slate-900/50 rounded-full h-2 shadow-inner">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-amber-300 to-orange-400 transition-all duration-1000 shadow-sm"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default SunCard;