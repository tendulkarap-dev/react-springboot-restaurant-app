import { Avatar, Badge, Box, IconButton } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { pink } from "@mui/material/colors";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./Navbar.css";
import { Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const Navbar = () => {
  const auth = useSelector((store) => store.auth);
  const cart = useSelector((store) => store.cart);

  const navigate = useNavigate();

  const handleAvatarClick = () => {
    if (auth.user?.role === "ROLE_CUSTOMER") {
      navigate("/my-profile");
    } else {
      navigate("/admin/restaurants");
    }
  };

  return (
    <Box className="px-5 z-50 sticky top-0 py-[.8rem] bg-[#e91e63] lg:px-20 flex justify-between">
      <div className="lg:mr-10 cursor-pointer flex items-center space-x-4">
        <li
          onClick={() => navigate("/")}
          className="logo font-semibold text-gray-300 text-2xl"
        >
          Sachein's Food
        </li>
      </div>

      <div className="flex items-center space-x-2 lg:space-x-10">
        <div className="">
          <IconButton>
            <SearchIcon sx={{ fontSize: "1.5rem" }} />
          </IconButton>
        </div>
        <div className="cursor-pointer">
          {auth.user ? (
            <Avatar
              onClick={handleAvatarClick}
              sx={{ bgcolor: "white", color: pink.A400 }}
            >
              {auth.user?.fullName[0].toUpperCase() || "U"}
            </Avatar>
          ) : (
            <IconButton onClick={() => navigate("/account/login")}>
              <Person />
            </IconButton>
          )}
        </div>

        <div className="">
          <IconButton onClick={() => navigate("/cart")}>
            <Badge
              color="primary"
              // 🔹 FIX: cart.cart?.items is an array of objects. Badge cannot render objects directly.
              // Instead, show the number of items in the cart
              badgeContent={cart.cart?.items?.length || 0} 
              // Original (caused error): badgeContent={cart.cart?.items}
            >
              <ShoppingCartIcon sx={{ fontSize: "1.5rem" }} />
            </Badge>
          </IconButton>
        </div>
      </div>
    </Box>
  );
};
