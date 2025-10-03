import { Chip, IconButton } from "@mui/material";
import React from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutlineSharp";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutlineSharp";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeCartItem, updateCartItem } from "../../State/Cart/Action";

export const CartItem = ({ item }) => {
  const cart = useSelector((store) => store.cart);
  const auth = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const handleUpdateCartItem = (value) => {
    if (value === -1 && item.quantity === 1) {
      handleRemoveCartItem();
    }
    const data = { cartItemId: item.id, quantity: item.quantity + value };
    dispatch(updateCartItem({ data, jwt }));
  };
  const handleRemoveCartItem = () => {
    dispatch(removeCartItem({ cartItemId: item.id, jwt: auth.jwt || jwt }));
  };

  return (
    <div className="px-5">
      <div className="lg:flex items-center lg:space-x-5">
        <div>
          <img
            className="w-[5rem] object-cover"
            src={item.food.images[0]}
            alt=""
          />
        </div>
        <div className="flex items-center justify-between lg:w-full">
          <div className="space-y-1 lg:space-y-3 w-full">
            <p>{item.food.name}</p>
            <div className="flex items-center space-x-1">
              <IconButton onClick={() => handleUpdateCartItem(-1)}>
                <RemoveCircleOutlineIcon />
              </IconButton>
              <div className="w-5 h-5 flex items-center justify-center">
                {item.quantity}
              </div>
              <IconButton onClick={() => handleUpdateCartItem(1)}>
                <AddCircleOutlineIcon />
              </IconButton>
            </div>
          </div>
          <p>{item.totalPrice}</p>
        </div>
      </div>
      <div className="pt-3 space-x-2">
        {item.ingredients.map((ingredient, index) => (
          <Chip
            key={index} // ✅ Added key to remove React warning
            label={ingredient}
          />
        ))}
      </div>
    </div>
  );
};
