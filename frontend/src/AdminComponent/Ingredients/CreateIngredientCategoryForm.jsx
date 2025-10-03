import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { createIngredientCategory } from "../../State/Ingredients/Action";
import { useDispatch, useSelector } from "react-redux";

const CreateIngredientCategoryForm = () => {
  const dispatch=useDispatch();
  const {restaurant} = useSelector((store)=>store);
  const jwt=localStorage.getItem("jwt")
  const [formData, setFormData] = useState({
    name: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault()
    const data ={name:formData.name,restaurantId:restaurant.usersRestaurant.id}
    console.log(formData);
    dispatch(createIngredientCategory({data,jwt}))
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <div className="">
      <div className="p-5">
        <h1 className="text-gray-400 text-center text-xl pb-10">
          Create Ingredient Category
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Category"
            variant="outlined"
            onChange={handleInputChange}
            value={formData.name}
          ></TextField>
          <Button variant="contained" type="submit">
            Create Category
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateIngredientCategoryForm;
