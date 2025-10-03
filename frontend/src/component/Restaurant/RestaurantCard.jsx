import React from "react";
import { Card, Chip, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorite } from "../../State/Authentication/Action";
import { isPresentInFavorites } from "../Config/Logic.js";

const RestaurantCard = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const auth = useSelector((store) => store.auth);

  if (!item) return null; // safeguard for undefined item

  // ✅ Add to favorites (stops propagation so it doesn't navigate)
  // ✅ Add to favorites (stops propagation so it doesn't navigate)
const handleAddToFavorite = (restaurant, e) => {
  e.stopPropagation(); // stop click from navigating
  // pass restaurant.id and jwt correctly as an object:
  dispatch(addToFavorite({ restaurantId: restaurant.id, jwt }));
};


  
  const handleNavigateToRestaurant = () => {
    navigate(`/restaurant/${item.address.city || "unknown"}/${item.name}/${item.id}`)

  };

  return (
    <Card
      className="w-[18rem] cursor-pointer"
      onClick={handleNavigateToRestaurant} // ✅ entire card clickable
    >
      <div className="relative">
        <img
          className="w-full h-[10rem] rounded-t-md object-cover"
          src={item?.images?.[1] || "/fallback-image.jpg"}
          alt={item?.name || "restaurant"}
        />
        <Chip
          size="small"
          className="absolute top-2 left-2"
          color={item.open ? "success" : "error"}
          label={item.open ? "Open" : "Closed"}
        />
      </div>
      <div className="p-4 textPart lg:flex w-full justify-between">
        <div className="space-y-1">
          <p className="font-semibold text-lg">{item?.name}</p>
          <p className="text-gray-500 text-sm">{item.description}</p>
        </div>
        <div>
          <IconButton onClick={(e) => handleAddToFavorite(item, e)}>
            {isPresentInFavorites(auth.favorites, item) ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
        </div>
      </div>
    </Card>
  );
};

export default RestaurantCard;
