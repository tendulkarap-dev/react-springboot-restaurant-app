// src/Util/categorizeIngredients.js
export const categorizeIngredients = (ingredients = []) => {
  return ingredients.reduce((acc, ingredient) => {
    // Safe category name fallback
    const categoryName = ingredient?.category?.name || "Other";
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(ingredient);
    return acc;
  }, {});
};
