// src/components/Dashboard/Dashboard.jsx
import React, { useEffect } from "react";
import {
  Grid,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuTable from "../Menu/MenuTable";
import OrderTable from "../Orders/OrderTable";
import { useDispatch, useSelector } from "react-redux";
import {
  getRestaurantByUserId,
  deleteRestaurant,
} from "../../State/Restaurant/Action";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { restaurant } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  // ✅ Load the restaurant of the logged-in owner
  useEffect(() => {
    if (jwt) {
      dispatch(getRestaurantByUserId(jwt));
    }
  }, [dispatch, jwt]);

  // ✅ Delete handler (like your MenuTable delete)
  const handleDelete = (restaurantId) => {
    dispatch(deleteRestaurant({ restaurantId, jwt }));
  };

  return (
    <div>
      <Grid container spacing={2}>
        {/* Manage Restaurants Table */}
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Manage Restaurants" />
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {restaurant?.usersRestaurant ? (
                    <TableRow>
                      <TableCell>{restaurant.usersRestaurant?.id}</TableCell>
                      <TableCell>
                        {restaurant.usersRestaurant?.name || "N/A"}
                      </TableCell>
                      <TableCell>
                        {restaurant.usersRestaurant?.address
                          ? `${restaurant.usersRestaurant.address.street}, ${restaurant.usersRestaurant.address.city}`
                          : "N/A"}
                      </TableCell>

                      <TableCell>
                        <IconButton
                          color="error"
                          onClick={() =>
                            handleDelete(restaurant.usersRestaurant.id)
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No restaurants found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>

        {/* Menu Table Section */}
        <Grid item xs={12} lg={8}>
          <MenuTable />
        </Grid>

        {/* Orders Table Section */}
        <Grid item xs={12} lg={6}>
          <OrderTable />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
