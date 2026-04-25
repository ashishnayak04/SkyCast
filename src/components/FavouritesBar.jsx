const FavouritesBar = ({ favourites, onSelect, onRemove, currentCity }) => {
  if (favourites.length === 0) return null;

  return (
    <div>
      <p className="text-white/70 dark:text-slate-400 text-xs mb-2.5 font-semibold uppercase tracking-wider">Pinned cities</p>
      <div className="flex flex-wrap gap-2">
        {favourites.map((city) => (
          <div key={city}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-medium transition-all shadow-sm hover:scale-105 active:scale-95 cursor-pointer
              ${currentCity === city
                ? "bg-blue-500/20 border-blue-400/50 dark:bg-blue-500/20 dark:border-blue-500/50 text-white dark:text-blue-300 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
                : "bg-white/20 dark:bg-slate-800/50 border-white/40 dark:border-slate-600 text-white/90 dark:text-slate-300 hover:bg-white/30 dark:hover:bg-slate-700"}`}>
            <span onClick={() => onSelect(city)}>📌 {city}</span>
            <button onClick={() => onRemove(city)}
              className="ml-1.5 text-white/50 hover:text-white dark:text-slate-500 dark:hover:text-red-400 text-sm font-bold leading-none transition-colors">
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavouritesBar;
