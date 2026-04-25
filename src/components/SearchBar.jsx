import { useState } from "react";

const SearchBar = ({ onSearch, onLocate }) => {
  const [city, setCity] = useState("");
  const recent = JSON.parse(localStorage.getItem("recentCities") || "[]");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) { onSearch(city.trim()); setCity(""); }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search for a city..."
          className="flex-1 px-5 py-3.5 rounded-2xl bg-white/20 dark:bg-slate-800/40 backdrop-blur-md text-white dark:text-slate-100 placeholder-white/70 dark:placeholder-slate-400 border border-white/40 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-white/50 dark:focus:ring-blue-500/50 shadow-[0_4px_30px_rgba(0,0,0,0.1)] text-sm transition-all"
        />
        <button type="submit" className="px-6 py-3.5 bg-white/25 dark:bg-slate-700/50 hover:bg-white/40 dark:hover:bg-slate-700 text-white dark:text-slate-200 rounded-2xl border border-white/40 dark:border-slate-600 font-medium text-sm transition-all shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:scale-105 active:scale-95">
          Search
        </button>
        <button type="button" onClick={onLocate} title="Use my location"
          className="px-4 py-3.5 bg-white/25 dark:bg-slate-700/50 hover:bg-white/40 dark:hover:bg-slate-700 text-white dark:text-slate-200 rounded-2xl border border-white/40 dark:border-slate-600 text-lg transition-all shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:scale-105 active:scale-95 flex items-center justify-center">
          📍
        </button>
      </form>
      {recent.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {recent.map((c) => (
            <button key={c} onClick={() => onSearch(c)}
              className="px-4 py-1.5 text-xs font-medium bg-white/20 dark:bg-slate-800/50 hover:bg-white/30 dark:hover:bg-slate-700 text-white dark:text-slate-300 rounded-full border border-white/30 dark:border-slate-600 transition-all shadow-sm hover:scale-105">
              {c}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
