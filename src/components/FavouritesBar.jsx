const FavouritesBar = ({ favourites, onSelect, onRemove, currentCity }) => {
  if (favourites.length === 0) return null;

  return (
    <div>
      <p className="text-white/50 text-xs mb-2 font-medium uppercase tracking-wider">Pinned cities</p>
      <div className="flex flex-wrap gap-2">
        {favourites.map((city) => (
          <div key={city}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full border text-sm transition-all cursor-pointer
              ${currentCity === city
                ? "bg-white/30 border-white/50 text-white"
                : "bg-white/10 border-white/20 text-white/80 hover:bg-white/20"}`}>
            <span onClick={() => onSelect(city)}>📌 {city}</span>
            <button onClick={() => onRemove(city)}
              className="ml-1 text-white/40 hover:text-white/80 text-xs font-bold leading-none">
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavouritesBar;
