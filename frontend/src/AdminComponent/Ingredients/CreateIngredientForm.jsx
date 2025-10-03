import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createIngredient, getIngredientCategory } from "../../State/Ingredients/Action";

const CreateIngredientForm = () => {
  const { restaurant, ingredients } = useSelector((store) => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
  });

  // Fetch categories only once on mount
  useEffect(() => {
    if (restaurant.usersRestaurant?.id) {
      dispatch(getIngredientCategory({ id: restaurant.usersRestaurant.id, jwt }));
    }
    // Only run on mount
  }, []); 

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      restaurantId: restaurant.usersRestaurant.id,
    };
    dispatch(createIngredient({ data, jwt }));
    setFormData({ name: "", categoryId: "" }); // reset form after creation
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-5">
      <h1 className="text-gray-400 text-center text-xl pb-10">
        Create Ingredient
      </h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Ingredient Name"
          variant="outlined"
          onChange={handleInputChange}
          value={formData.name}
        />

        <FormControl fullWidth>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            value={formData.categoryId || ""}
            label="Category"
            onChange={handleInputChange}
            name="categoryId"
          >
            {ingredients.category?.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" type="submit">
          Create Ingredient
        </Button>
      </form>
    </div>
  );
};

export default CreateIngredientForm;
