// src/components/MenuCard.jsx
import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { categorizeIngredients } from "../Util/categorizeIngredients";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../State/Cart/Action";

const MenuCard = ({ item }) => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const dispatch = useDispatch();

  // ✅ Safe image fallback
  const imageUrl =
    item?.images && item.images.length > 0
      ? item.images[0]
      : "https://via.placeholder.com/150";

  // ✅ Safe ingredients fallback
  const ingredientsList = Array.isArray(item?.ingredients)
    ? item.ingredients
    : [];

  // ✅ Categorize ingredients safely
  let categorized = {};
  try {
    categorized = categorizeIngredients(ingredientsList);
  } catch (err) {
    console.error("Error categorizing ingredients:", err);
    categorized = {};
  }

  const handleCheckBoxChange = (ingredientName) => {
    if (selectedIngredients.includes(ingredientName)) {
      setSelectedIngredients(
        selectedIngredients.filter((ing) => ing !== ingredientName)
      );
    } else {
      setSelectedIngredients([...selectedIngredients, ingredientName]);
    }
  };

  const handleAddItemToCart = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwt");

    const reqData = {
      token,
      cartItem: {
        foodId: item.id,
        quantity: 1,
        ingredients: selectedIngredients,
      },
    };

    console.log("JWT Token:", token);
    console.log("Menu Item ID:", item?.id);
    console.log("Selected Ingredients:", selectedIngredients);
    console.log("Full reqData:", reqData);

    // ✅ Dispatch to Redux
    dispatch(addItemToCart(reqData));
  };

  // ✅ Helper to safely render values
  const renderValue = (value) => {
    if (value === null || value === undefined) return "";
    return typeof value === "object" ? JSON.stringify(value) : value;
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel-content"
        id={`panel-${item?.id || "unknown"}-header`}
      >
        <div className="lg:flex items-center justify-between">
          <div className="lg:flex items-center lg:gap-5">
            <img
              className="w-[7rem] h-[7rem] object-cover"
              src={imageUrl}
              alt={item?.name || "Menu Item"}
            />
            <div className="space-y-1 lg:space-y-5 lg:max-w-2xl">
              {/* ✅ Fixed: render string instead of object */}
              <p className="font-semibold text-xl">
                {renderValue(item?.name) || "Unnamed"}
              </p>
              <p>{item?.price || "N/A"}</p>
              <p className="text-gray-400">
                {renderValue(item?.description) || ""}
              </p>

              {/* ✅ Fixed: category is an object, render its name */}
              <p className="text-gray-500">
                Category: {item?.category?.name || "Unknown"}
              </p>
            </div>
          </div>
        </div>
      </AccordionSummary>

      <AccordionDetails>
        <form onSubmit={handleAddItemToCart}>
          {/* If no ingredients */}
          {Object.keys(categorized).length === 0 && (
            <p className="text-gray-500">No ingredients available</p>
          )}

          <div className="flex gap-5 flex-wrap">
            {Object.keys(categorized).map((category) => (
              <div key={category}>
                <p className="font-semibold">{category}</p>
                <FormGroup>
                  {categorized[category].map((ingredient) => (
                    <FormControlLabel
                      key={ingredient.id || ingredient.name}
                      control={
                        <Checkbox
                          onChange={() =>
                            handleCheckBoxChange(ingredient.name)
                          }
                          checked={selectedIngredients.includes(
                            ingredient.name
                          )}
                        />
                      }
                      label={ingredient.name}
                    />
                  ))}
                </FormGroup>
              </div>
            ))}
          </div>

          <div className="pt-5">
            <Button variant="contained" type="submit">
              Add to cart
            </Button>
          </div>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};

export default MenuCard;
