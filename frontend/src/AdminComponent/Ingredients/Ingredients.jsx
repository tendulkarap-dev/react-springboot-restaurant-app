import React from "react";
import IngredientTable from "./IngredientTable";
import IngredientCategoryTable from "./IngredientCategoryTable";
import Grid from "@mui/material/Grid";

export const Ingredients = () => {
  return (
    <div className="px-2">
      <Grid container spacing={2}>
        <Grid items xs={12} lg={8}>
          <IngredientTable />
        </Grid>
        <Grid items xs={12} lg={4}>
          <IngredientCategoryTable />
        </Grid>
      </Grid>
    </div>
  );
};
