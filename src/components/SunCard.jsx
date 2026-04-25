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
    <div className="bg-white/15 backdrop-blur border border-white/25 rounded-2xl p-5 text-white">
      <h3 className="text-sm font-medium text-white/70 mb-4">Sunrise & Sunset</h3>

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
        <div className="bg-white/10 rounded-xl p-3">
          <p className="text-xs text-white/50 mb-1">🌅 Sunrise</p>
          <p className="text-base font-medium">{formatTime(sunrise, tz)}</p>
        </div>
        <div className="bg-white/10 rounded-xl p-3">
          <p className="text-xs text-white/50 mb-1">☀️ Daylight</p>
          <p className="text-base font-medium">{getDaylightDuration(sunrise, sunset)}</p>
        </div>
        <div className="bg-white/10 rounded-xl p-3">
          <p className="text-xs text-white/50 mb-1">🌇 Sunset</p>
          <p className="text-base font-medium">{formatTime(sunset, tz)}</p>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-between text-xs text-white/40 mb-1">
          <span>Day progress</span>
          <span>{progress < 100 && progress > 0 ? `${progress}%` : progress === 0 ? "Before sunrise" : "After sunset"}</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-1.5">
          <div
            className="h-1.5 rounded-full bg-gradient-to-r from-amber-300 to-orange-400 transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default SunCard;