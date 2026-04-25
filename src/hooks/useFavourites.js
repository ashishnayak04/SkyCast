import { useState } from "react";

export const useFavourites = () => {
  const [favourites, setFavourites] = useState(() =>
    JSON.parse(localStorage.getItem("favouriteCities") || "[]")
  );

  const addFavourite = (city) => {
    if (favourites.includes(city)) return;
    const updated = [...favourites, city].slice(0, 8);
    setFavourites(updated);
    localStorage.setItem("favouriteCities", JSON.stringify(updated));
  };

  const removeFavourite = (city) => {
    const updated = favourites.filter((c) => c !== city);
    setFavourites(updated);
    localStorage.setItem("favouriteCities", JSON.stringify(updated));
  };

  const isFavourite = (city) => favourites.includes(city);

  return { favourites, addFavourite, removeFavourite, isFavourite };
};
