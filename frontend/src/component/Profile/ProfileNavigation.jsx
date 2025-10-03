import React from "react";
import ShoppingBagSharpIcon from "@mui/icons-material/ShoppingBagSharp";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import AccountBalanceWalletSharpIcon from "@mui/icons-material/AccountBalanceWalletSharp";
import NotificationsActiveSharpIcon from "@mui/icons-material/NotificationsActiveSharp";
import EventSharpIcon from "@mui/icons-material/EventSharp";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";
import { Divider, Drawer, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../State/Authentication/Action";


const menu = [
  { title: "Orders", icon: <ShoppingBagSharpIcon /> },
  { title: "Favorites", icon: <FavoriteSharpIcon /> },
  { title: "Address", icon: <HomeSharpIcon /> },
  { title: "Payments", icon: <AccountBalanceWalletSharpIcon /> },
  { title: "Notifications", icon: <NotificationsActiveSharpIcon /> },
  { title: "Events", icon: <EventSharpIcon /> },
  { title: "LogOut", icon: <LogoutSharpIcon /> },
];

export const ProfileNavigation = ({ open, handleClose }) => {
  const isSmallScreen = useMediaQuery("(max-width:900px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigate = (item) => {
    if (item.title === "LogOut") {
      dispatch(logout());
      navigate("/");
      return;
    }
    navigate(`/my-profile/${item.title.toLowerCase()}`);
  };
  return (
    <div>
      <Drawer
        variant={isSmallScreen ? "temporary" : "permanent"}
        onClose={handleClose}
        open={isSmallScreen ? open : true}
        anchor="left"
        sx={{ zIndex: -1, position: "sticky" }}
      >
        <div
          className="w-[20vw] lg:[20vw] h-[110vh] 
        flex flex-col justify-center text-xl gap-7 pt-12"
        >
          {menu.map((item, i) => (
            <div key={i}>
              <div
                onClick={() => handleNavigate(item)}
                className="px-5 flex items-center space-x-5 cursor-pointer"
              >
                {item.icon}
                <span>{item.title}</span>
              </div>
              {i !== menu.length - 1 && <Divider />}
            </div>
          ))}
        </div>
      </Drawer>
    </div>
  );
};
