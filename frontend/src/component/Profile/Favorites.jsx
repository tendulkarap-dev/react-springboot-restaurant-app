import React from "react";
import RestaurantCard from "../Restaurant/RestaurantCard";
import { useSelector } from "react-redux";

export const Favorites = () => {
  // ✅ directly grab auth from store
  const auth = useSelector((store) => store.auth);

  // ✅ fallback if auth or favorites not loaded
  const favorites = auth?.favorites || [];

  return (
    <div>
      <h1 className="py-5 text-xl font-semibold text-center">My Favorites</h1>
      <div className="flex flex-wrap gap-3 justify-center">
        {favorites.length === 0 ? (
          <p>No favorites yet</p>
        ) : (
          favorites.map((item) => (
            <RestaurantCard key={item.id} item={item} />
          ))
        )}
      </div>
    </div>
  );
};

