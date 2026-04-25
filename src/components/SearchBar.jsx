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
          className="flex-1 px-4 py-3 rounded-xl bg-white/20 backdrop-blur text-white placeholder-white/70 border border-white/30 focus:outline-none focus:border-white text-sm"
        />
        <button type="submit" className="px-5 py-3 bg-white/25 hover:bg-white/40 text-white rounded-xl border border-white/30 font-medium text-sm transition-all">
          Search
        </button>
        <button type="button" onClick={onLocate} title="Use my location"
          className="px-4 py-3 bg-white/25 hover:bg-white/40 text-white rounded-xl border border-white/30 text-lg transition-all">
          📍
        </button>
      </form>
      {recent.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {recent.map((c) => (
            <button key={c} onClick={() => onSearch(c)}
              className="px-3 py-1 text-xs bg-white/15 hover:bg-white/30 text-white/90 rounded-full border border-white/20 transition-all">
              {c}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
