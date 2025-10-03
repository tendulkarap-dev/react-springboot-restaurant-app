import React, { useEffect } from "react";
import { OrderCard } from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
//import { useNavigate } from "react-router-dom";
import { getUsersOrders } from "../../State/Order/Action";
import { useNavigate } from "react-router-dom";

export const Orders = () => {
  const auth = useSelector((store) => store.auth);
  const order = useSelector((store) => store.order);
  const cart = useSelector((store) => store.cart);
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();

  useEffect(() => {
    if (jwt) {
      dispatch(getUsersOrders(jwt));
    }
  }, [jwt, dispatch]);

  return (
    <div className="flex items-center flex-col">
      <h1 className="text-xl text-center py-7 font-semibold">My Orders</h1>
      <div className="space-y-5 w-full lg:w-1/2">
        {order.orders.map((order) =>
          order.items.map((item) => (
            <OrderCard
              key={item.id} // ✅ added unique key, assuming item.id is unique
              order={order}
              item={item}
            />
          ))
        )}
      </div>
    </div>
  );
};
