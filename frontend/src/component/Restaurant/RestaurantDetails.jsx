import {
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MenuCard from "./MenuCard";
import { useNavigate, useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getRestaurantById,
  getRestaurantsCategory,
} from "../../State/Restaurant/Action";
import { getMenuItemsByRestaurantId } from "../../State/Menu/Action";


const foodTypes = [
  { Label: "All", value: "all" },
  { Label: "Vegetarian", value: "vegetarian" },
  { Label: "Non-Vegetarian", value: "non-vegetarian" },
  { Label: "Seasonal", value: "seasonal" },
];

const RestaurantDetails = () => {
  const [foodType, setFoodType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const restaurantState = useSelector((store) => store.restaurant);
  const menuState = useSelector((store) => store.menu);
  const auth = useSelector((store) => store.auth);

  const { id,city } = useParams();

  const handleFilter = (e) => {
    setFoodType(e.target.value,e.target.name);
  };

  const handleFilterCategory = (e,value) => {
    setSelectedCategory(e.target.value,e.target.name,value);
  };

  useEffect(() => {
    console.log("Fetching restaurant details for ID:", id, "with JWT:", jwt);
    dispatch(getRestaurantById({ jwt, restaurantId: id }));
    dispatch(getRestaurantsCategory({ jwt, restaurantId: id }));
  //  dispatch(getMenuItemsByRestaurantId({jwt,restaurantId:id,vegetarian:true,nonveg:false,seasonal:true}))
  }, [dispatch, jwt, id]);

  useEffect(() => {
  dispatch(
    getMenuItemsByRestaurantId({
      jwt,
      restaurantId: id,
      vegetarian: foodType === "vegetarian",
      nonveg: foodType === "non-vegetarian",
      seasonal: foodType === "seasonal",
      foodCategory:
        selectedCategory
    //     && selectedCategory !== "all"
    //      ? selectedCategory
    //      : null,
    })
  );
}, [dispatch, jwt, id, selectedCategory, foodType]);

  return (
    <div className="px-5 lg:px-20">
      <section>
        <h3 className="text-gray-500 py-2 mt-10">
          {restaurantState.restaurant?.name}/{id}
        </h3>
        <div>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <img
                className="w-full h-[40vh] object-cover"
                src={restaurantState.restaurant?.images?.[0]}
                alt=""
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <img
                className="w-full h-[40vh] object-cover"
                src={restaurantState.restaurant?.images?.[1]}
                alt=""
              />
            </Grid>

            <Grid item xs={12} lg={6}>
              <img
                className="w-full h-[40vh] object-cover"
                src={restaurantState.restaurant?.images?.[0]}
                alt=""
              />
            </Grid>
          </Grid>
        </div>
        <div className="pt-3 pb-5">
          <h1 className="text-4xl font-semibold">
            {restaurantState.restaurant?.name}
          </h1>
          <p className="text-gray-500 mt-1">
            {restaurantState.restaurant?.description}
          </p>

          <div className="space-y-3 mt-3">
            <p className="text-gray-500 flex items-center gap-3">
              <LocationOnIcon />
              <span>
                {restaurantState.restaurant?.city}
              </span>
            </p>
            <p className="text-gray-500 flex items-center gap-3">
              <CalendarTodayIcon />
              <span>Mon-Sun: 9.00 AM - 9.00 PM(Today)</span>
            </p>
          </div>
        </div>
      </section>

      <Divider />
      <section className="pt-[2rem] lg:flex relative">
        {/* FILTER */}
        <div className="space-y-10 lg:w-[20%] filter ">
          <div className="box space-y-5 lg:sticky top-28 p-5 shadow-md">
            <div>
              <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
                Food Type
              </Typography>
              <FormControl className="py-10 space-y-5" component={"fieldset"}>
                <RadioGroup
                  onChange={handleFilter}
                  name="food_type"
                  value={foodType}
                >
                  {foodTypes.map((item) => (
                    <FormControlLabel
                      key={item.value}
                      value={item.value}
                      control={<Radio />}
                      label={item.Label}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
            <Divider />
            <div>
              <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
                Food Category
              </Typography>
              <FormControl className="py-10 space-y-5" component={"fieldset"}>
                <RadioGroup
                  onChange={handleFilterCategory}
                  name="food_category"
                  value={selectedCategory}
                >
                  {restaurantState.categories?.map((item) => (
                    <FormControlLabel
                      key={item.name}
                      value={item.name}
                      control={<Radio />}
                      label={item.name}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        </div>

        {/* MENU */}
        <div className="space-y-5 lg:w-[80%] lg:pl-10">
          {menuState.menuItems?.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default RestaurantDetails;
